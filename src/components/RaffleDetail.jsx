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
} from "react-bootstrap";
import styled from "styled-components";
import { useAccountsValueContext } from "@contexts/AccountsContext";
import { Contract } from "@eth/Web3";
import { RaffleMeta } from "@eth/contracts/RaffleMeta";
import { fetchMetadata } from "@services/nft-metadata-fetcher";

const raffleContainer = {
  margin: "10px 0",
  "justify-content": "center",
};

const imageWrapper = {
  width: "422px",
  height: "422px",
  // border: "1px solid black",
};

// const contentsContainer = {
//   width: "422px",
//   height: "422px",
//   // border: "1px solid blue",
//   padding: "12px",
//   "text-align": "left",
// };

// const imageStyle = {
//   width: "100%",
//   height: "100%",
//   "object-fit": "fill",
// };

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

export default function RaffleDetail() {

  const accounts = useAccountsValueContext();
  const [raffle, setRaffle] = useState();
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [soldTicketsNum, setSoldTicketsNum] = useState(0);
  const [isError, setIsError] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);

  const params = useParams();

  useEffect(() => {
    if(accounts.length > 0) {

    } else {
      
    }
  }, [accounts, raffle]);

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

  useEffect(() => {
    async function fetchRaffle() {
      setIsLoading(true);
      setIsError(false);
      try {

        const raffleMeta = {
          address: params.contractAddress,
          abi: RaffleMeta.abi
        };

        const results = await Contract(raffleMeta).methods.getRaffle().call();

        console.log(results);

        const purchases = await Contract(raffleMeta).methods.getPurchases().call();

        console.log("ppp", purchases);

        // const result = await fetch(
        //   "https://gateway.ipfs.io/ipfs/" + results[6].split("//")[1]
        // );
        // const image = (await result.json()).image;
        // // image.split("//");

        // const src = await fetch(
        //   "https://gateway.ipfs.io/ipfs/" + image.split("//")[1]
        // );

        // console.log("sssss", src.url);

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
          ticketPricePointer: parseInt(results[10]),
          nftMeta: await fetchMetadata(results[6]),
        };

        let total = 0;
        for(let i=0; i<purchases.length; i++) {
          total += parseInt(purchases[i].tickets);
        }

        setSoldTicketsNum(total);
        setRaffle(raffle);
        setPurchases(purchases);



        setIsLoading(false);
      } catch(e) {
        console.log(e)
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchRaffle();
  }, []);

  if (isLoading) {
    return (<p>Loading..</p>);
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
                      {findTimeDiffInDays(timeDiff)}일{" "}
                      {findTimeDiffInHours(timeDiff)}시{" "}
                      {findTimeDiffInMins(timeDiff)}분{" "}
                      {findTimeDiffInSecs(timeDiff)}초{" "}
                    </Col>
                  </Row>
                </ContentItem>

                <ContentItem className="bg-light border">
                  <Row>
                    <Col sm={4} style={contentTitleStyle}>
                      티켓 가격
                    </Col>
                    <Col sm={8} style={contentItemStyle}>
                      {raffle.ticketPrice /
                        Math.pow(10, raffle.ticketPricePointer)}{" "}
                      ETH
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
                <Button
                  variant="primary"
                  onClick={() => {
                    // parseLeftTime(raffle.ended);
                  }}
                >
                  참여하기
                </Button>
              </RaffleContentsFooter>
            </Stack>
          </Col>
        </Row>
      </Container>
    );
  }

}