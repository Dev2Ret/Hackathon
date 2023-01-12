import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Container,
  Image,
  Button,
  Stack,
  Spinner,
  InputGroup,
  Form,
  Alert
} from "react-bootstrap";
import styled from "styled-components";
import { useAccountsValueContext } from "@contexts/AccountsContext";
import { Contract } from "@eth/Web3";
import { RaffleMeta } from "@eth/contracts/RaffleMeta";
import { fetchMetadata } from "@services/nft-metadata-fetcher";
import RaffleState from "@assets/RaffleState";
import RaffleDetailCompleted from "@molecules/RaffleDetailCompleted";

const raffleContainer = {
  margin: "10px 0",
  "justify-content": "center",
};

const imageWrapper = {
  width: "422px",
  height: "422px",
  // border: "1px solid black",
};

const contentItemStyle = {
  "white-space": "nowrap",
  "text-overflow": "ellipsis",
  overflow: "hidden",
  "text-align": "right",
};

const contentTitleStyle = {
  "font-size": "small",
};
  
const leftItemStyle = {
  padding: "8px",
  display: "flex",
  "justify-content": "center",
  "align-items": "center"
};

const rightItemStyle = {
  // backgroundColor: "blue",
  padding: "8px",
};

const contentsContainer = {
  height: "100%"
}

const containerWrapper = {
  "margin-top": "20px"
}

const imageStyle = {
  width: "100%",
  "object-fit": "fill",
};

const RaffleContentsHeader = styled.div`
  background-color: #57b149;
  padding: 8px;
`;

const RaffleContentsBody = styled.div`
  height: 100%;
  padding: 8px;
`;

const RaffleContentsFooter = styled.div`
  padding: 8px;
  border: 1.4px solid #979797;
  border-style: dashed;
  margin-top: 8px;
`;

const ContentItem = styled.div`
  padding: 4px;
`;

const TimeContainer = styled.div``;

const TicketsContainer = styled.div``;

const TicketPriceContainer = styled.div``;

const ContractAddressContainer = styled.div``;

const NFTName = styled.h4`
  margin-bottom: 24px;
  padding: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const inputGroupTextStyle = {
  "font-size": "small"
}

const fromControlStyle = {
  "width": "120px"
}

const costBoxStyle = {
  "display": "flex",
  "align-items": "center"
}

export default function RaffleDetail() {
  const ETH_TO_WEI = 1000000000000000000;

  const accounts = useAccountsValueContext();
  const [raffle, setRaffle] = useState();
  const [purchases, setPurchases] = useState([]);
  const [soldTicketsNum, setSoldTicketsNum] = useState(0);
  const [isError, setIsError] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  const [winnerInfo, setWinnerInfo] = useState();
  const [ownerInfo, setOwnerInfo] = useState();
  
  const params = useParams();

  const raffleMeta = {
    address: params.contractAddress,
    abi: RaffleMeta.abi,
  };

  useEffect(() => {
    fetchRaffle();
  }, [accounts]);

  useEffect(() => {
    const id = setInterval(() => {
      if(raffle !== undefined) {
        const date = new Date();
        let timeDiffSecs = raffle.expiredAt - parseInt(date.getTime() / 1000);
        setTimeDiff(timeDiffSecs);
      }
    }, 1000);
    return () => {
      clearInterval(id);
    }
  }, [raffle]);

  function findTimeDiffInSecs(timeDiffSecs) {
    return timeDiffSecs % 60;
  }

  function findTimeDiffInMins(timeDiffSecs) {
    return parseInt((timeDiffSecs / 60) % 60);
  }

  function findTimeDiffInHours(timeDiffSecs) {
    return parseInt((timeDiffSecs / 60 / 60) % 24);
  }

  function findTimeDiffInDays(timeDiffSecs) {
    return parseInt(timeDiffSecs / 60 / 60 / 24);
  }

  async function fetchRaffle() {
    setIsLoading(true);
    setIsError(false);
    try {

      const results = await Contract(raffleMeta).methods.getRaffle().call();
      const purchases = await Contract(raffleMeta)
        .methods.getPurchases()
        .call();

      const raffle = {
        owner: results[0],
        nftContractAddress: results[1],
        nftTokenId: parseInt(results[2]),
        nftTokenType: parseInt(results[3]),
        nftName: results[4],
        nftSymbol: results[5],
        nftTokenURI: results[6],
        expiredAt: parseInt(results[7]),
        ticketCap: parseInt(results[8]),
        ticketPrice: parseInt(results[9]),
        nftMeta: await fetchMetadata(results[6]),
        state: parseInt(results[10])
        // state: RaffleState.Completed,
      };

      console.log("rrrr", raffle);

      if(raffle.state === RaffleState.Completed) {
        const winnerRes = await Contract(raffleMeta)
          .methods.getWinnerInfo()
          .call();
        const ownerRes = await Contract(raffleMeta)
          .methods.getOwnerInfo()
          .call();

        const _winnerInfo = {
          winner: winnerRes[0],
          given: winnerRes[1]
        }

        const _ownerInfo = {
          owner: ownerRes[0],
          given: ownerRes[1],
        };

        setWinnerInfo(_winnerInfo);
        setOwnerInfo(_ownerInfo);
      }

      let total = 0;
      for (let i = 0; i < purchases.length; i++) {
        total += parseInt(purchases[i].tickets);
      }

      setSoldTicketsNum(total);
      setRaffle(raffle);
      setPurchases(purchases);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsError(true);
      setIsLoading(false);
    }
  }

  function calculateCost() {
    const cost =
      tickets * (raffle.ticketPrice / ETH_TO_WEI);
    return isNaN(cost) ? 0 : parseFloat(cost.toFixed(4));
  }

  function handleTicketChange(e) {
    const value = parseInt(e.target.value);
    if (value <= raffle.ticketCap - soldTicketsNum) {
      setTickets(parseInt(e.target.value));
    }
  }

  async function purchaseTickets() {
    if(tickets < 1) return;

    try {
      setIsPurchasing(true);

      const raffleMeta = {
        address: params.contractAddress,
        abi: RaffleMeta.abi,
      };

      const receipt = await Contract(raffleMeta)
        .methods.purchaseTickets(tickets)
        .send({
          from: accounts[0],
          value: tickets * raffle.ticketPrice
        });

      console.log("rs : ", receipt);

      setTickets(0);

      setIsPurchasing(false);

      fetchRaffle();

    } catch (e) {
      setIsPurchasing(false);
      console.log("purchase tickets error", e);
    }

    // .then((receipt) => {
    //   navigate(
    //     `/raffles/eth/` +
    //       receipt.events.NFTRaffleCreated.returnValues.raffleAddress
    //   );
    // });
  }

  

  if (isLoading) {
    return (
      <Container fluid="md" style={containerWrapper}>
        <Spinner />
      </Container>
    );
  }

  if (isError) {
    return (<p>Error!!</p>);
  }

  if(raffle !== undefined) {
    return (
      <Container fluid="md" style={containerWrapper}>
        {/* <p>{raffle.nft.name}</p>
        <p>{raffle.nft.chain.symbol}</p> */}
        <Row className="justify-content-md-center" style={raffleContainer}>
          <Col sm={4} style={leftItemStyle} className="bg-secondary">
            <Image style={imageStyle} src={raffle.nftMeta.image} />
          </Col>
          <Col sm={4} style={rightItemStyle} className="bg-secondary">
            <Stack style={contentsContainer}>
              <NFTName>{`${raffle.nftMeta.name}`}</NFTName>
              <Stack gap={2}>
                <ContentItem className="bg-light border">
                  <Row>
                    <Col sm={4} style={contentTitleStyle}>
                      남은 시간
                    </Col>
                    <Col sm={8} style={contentItemStyle}>
                      {raffle.ended ? (
                        <>마감됨</>
                      ) : (
                        <>
                          {findTimeDiffInDays(timeDiff)}일{" "}
                          {findTimeDiffInHours(timeDiff)}시{" "}
                          {findTimeDiffInMins(timeDiff)}분{" "}
                          {findTimeDiffInSecs(timeDiff)}초{" "}
                        </>
                      )}
                    </Col>
                  </Row>
                </ContentItem>

                <ContentItem className="bg-light border">
                  <Row>
                    <Col sm={4} style={contentTitleStyle}>
                      티켓 가격
                    </Col>
                    <Col sm={8} style={contentItemStyle}>
                      {`${raffle.ticketPrice / ETH_TO_WEI} ETH`}
                    </Col>
                  </Row>
                </ContentItem>

                <ContentItem className="bg-light border">
                  <Row>
                    <Col sm={4} style={contentTitleStyle}>
                      티켓 현황
                    </Col>
                    <Col sm={8} style={contentItemStyle}>
                      {`${soldTicketsNum}/${raffle.ticketCap}`}{" "}
                    </Col>
                  </Row>
                </ContentItem>

                <ContentItem className="bg-light border">
                  <Row>
                    <Col sm={4} style={contentTitleStyle}>
                      래플 컨트랙트
                    </Col>
                    <Col sm={8} style={contentItemStyle}>
                      {params.contractAddress}
                    </Col>
                  </Row>
                </ContentItem>

                <ContentItem className="bg-light border">
                  <Row>
                    <Col sm={4} style={contentTitleStyle}>
                      NFT 컨트랙트
                    </Col>
                    <Col sm={8} style={contentItemStyle}>
                      {raffle.nftContractAddress}
                    </Col>
                  </Row>
                </ContentItem>
              </Stack>

              <RaffleContentsFooter className="d-grid gap-2">
                {raffle.state === RaffleState.Completed ? (
                  <RaffleDetailCompleted
                    winnerInfo={winnerInfo}
                    ownerInfo={ownerInfo}
                    account={accounts[0]}
                    raffleMeta={raffleMeta}
                    fetchRaffle={fetchRaffle}
                    ticketCap={raffle.ticketCap}
                    ticketPrice={raffle.ticketPrice}
                  />
                ) : raffle.state === RaffleState.Canceled ? (
                  <></>
                ) : raffle.state === RaffleState.Timeout ? (
                  <></>
                ) : raffle.state === RaffleState.Ongoing ? (
                  <>
                    <Row>
                      <Col>
                        <InputGroup>
                          <InputGroup.Text
                            style={inputGroupTextStyle}
                            id="basic-addon1"
                          >
                            티켓
                          </InputGroup.Text>
                          <Form.Control
                            type="number"
                            aria-label="Tickets"
                            aria-describedby="basic-addon1"
                            min={0}
                            max={raffle.ticketCap - soldTicketsNum}
                            value={tickets}
                            disabled={isPurchasing}
                            onChange={handleTicketChange}
                          />
                        </InputGroup>
                      </Col>
                      <Col style={costBoxStyle}>= {calculateCost()} ETH</Col>
                    </Row>

                    <Button
                      variant="primary"
                      disabled={isPurchasing}
                      onClick={purchaseTickets}
                    >
                      {isPurchasing ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <>티켓 구매하기</>
                      )}
                    </Button>
                  </>
                ) : null}

                {/* {raffle.state !== RaffleState.Ongoing ? (
                  <>
                    <Alert variant={"primary"}>
                      해당 래플은 마감 되었습니다.
                    </Alert>
                  </>
                ) : (
                  <></>
                )} */}
              </RaffleContentsFooter>
            </Stack>
          </Col>
        </Row>
      </Container>
    );
  }

}