import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Stack } from "react-bootstrap";
import styled from "styled-components";
import { Contract } from "@eth/Web3";
import { RaffleManagerMeta } from "src/eth/contracts/RaffleManagerMeta";
import { Exception } from "sass";

const raffleContainer = {
  margin: "10px 0",
  "justify-content": "center"
}

const imageWrapper = {
  width: "422px",
  height: "422px",
  // border: "1px solid black",
};

const contentsContainer = {
  width: "422px",
  height: "422px",
  // border: "1px solid blue",
  padding: "12px",
  "text-align": "left"
};

const imageStyle = {
  width: "100%",
  height: "100%",
  "object-fit": "fill",
};

const contentItemStyle = {
  "white-space": "nowrap",
  "text-overflow": "ellipsis",
  overflow: "hidden",
  "text-align": "right"
};

const contentTitleStyle = {
  "font-size": "small"
}

const NFTName = styled.h4`
  margin-bottom: 24px;
  padding: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ContentItem = styled.div `
  padding: 12px;
`;

export default function RaffleCheck({
  fullyWidenStyle,
  buttonWrapper,
  toRaffleTicket,
  selectedNFT,
  endTimestamp,
  totalTicketNum,
  ticketPrice,
  accounts,
}) {
  const navigate = useNavigate();

  let dt = new Date(endTimestamp);
  let stringDt =
    dt.getFullYear() +
    "년 " +
    (dt.getMonth() + 1) +
    "월 " +
    dt.getDate() +
    "일 " +
    dt.getHours() +
    "시 " +
    dt.getMinutes() +
    "분";

  let ticketPricePointer = 0;
  let ticketPriceInteger = ticketPrice;

  while (Math.floor(ticketPriceInteger) !== ticketPriceInteger) {
    ticketPricePointer += 1;
    ticketPriceInteger *= 10;
  }

  console.log(
    ticketPriceInteger,
    ticketPricePointer,
    ticketPriceInteger / Math.pow(10, ticketPricePointer)
  );

  function parseNFTTokenTypeToInt(tokenType) {
    if(tokenType === "ERC721") return 721;
    else if(tokenType === "ERC1155") return 1155;
    else return 20;
    // else throw Exception;
  }

  function createRaffle() {
    let ticketPricePointer = 0;
    let ticketPriceInteger = ticketPrice;

    while (Math.floor(ticketPriceInteger) !== ticketPriceInteger) {
      ticketPricePointer += 1;
      ticketPriceInteger *= 10;
    }

    Contract(RaffleManagerMeta)
      .methods.createRaffle(
        accounts[0],
        selectedNFT.contract.address,
        selectedNFT.tokenId,
        parseNFTTokenTypeToInt(selectedNFT.tokenType),
        endTimestamp,
        totalTicketNum,
        ticketPriceInteger,
        ticketPricePointer
      )
      .send({ from: accounts[0] })
      .then((receipt) => {
        navigate(
          `/raffles/eth/` +
            receipt.events.NFTRaffleCreated.returnValues.raffleAddress
        );
      });
  }

  return (
    <>
      <h3>Raffle Check</h3>

      <Row className="justify-content-md-center" style={raffleContainer}>
        <Col style={imageWrapper} lg="2">
          <Image
            style={imageStyle}
            src="http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg"
          />
        </Col>
        <Col style={contentsContainer} lg="2">
          <NFTName>{selectedNFT.name}</NFTName>
          <Stack gap={4}>
            <ContentItem className="bg-light border">
              <Row>
                <Col sm={4} style={contentTitleStyle}>
                  종료 시간
                </Col>
                <Col sm={8} style={contentItemStyle}>
                  {stringDt}
                </Col>
              </Row>
            </ContentItem>
            <ContentItem className="bg-light border">
              <Row>
                <Col sm={4} style={contentTitleStyle}>
                  총 티켓 발행량
                </Col>
                <Col sm={8} style={contentItemStyle}>
                  {totalTicketNum}
                </Col>
              </Row>
            </ContentItem>
            <ContentItem className="bg-light border">
              <Row>
                <Col sm={4} style={contentTitleStyle}>
                  티켓 가격
                </Col>
                <Col sm={8} style={contentItemStyle}>
                  {ticketPrice}
                </Col>
              </Row>
            </ContentItem>
            <ContentItem className="bg-light border">
              <Row>
                <Col sm={4} style={contentTitleStyle}>
                  컨트랙트 주소
                </Col>
                <Col sm={8} style={contentItemStyle}>
                  0xabcdef0123456789abcdef0123456789
                </Col>
              </Row>
            </ContentItem>
          </Stack>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col style={buttonWrapper}>
          <Button
            style={fullyWidenStyle}
            variant="primary"
            // disabled={selectedNFT === undefined}
            onClick={toRaffleTicket}
          >
            이전
          </Button>
        </Col>
        <Col style={buttonWrapper}>
          <Button
            style={fullyWidenStyle}
            variant="primary"
            // disabled={selectedNFT === undefined}
            onClick={createRaffle}
          >
            완료
          </Button>
        </Col>
      </Row>
    </>
  );
}
