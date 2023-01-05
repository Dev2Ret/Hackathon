import { React } from "react";
import { Row, Col, Button, Image, Stack } from "react-bootstrap";
import styled from "styled-components";

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
  buttonWrapper,
  toRaffleTicket,
  selectedNFT,
  endTimestamp,
  totalTicketNum,
  ticketPrice,
}) {

  let dt = new Date(endTimestamp);
  let stringDt = (
    dt.getFullYear() + "년 " + 
    (dt.getMonth() + 1) + "월 " +
    (dt.getDate()) + "일 " +
    (dt.getHours()) + "시 " +
    (dt.getMinutes()) + "분"
  );

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
        <Col style={buttonWrapper} lg="2">
          <Button
            variant="primary"
            // disabled={selectedNFT === undefined}
            onClick={toRaffleTicket}
          >
            이전
          </Button>
        </Col>
        <Col style={buttonWrapper} lg="2">
          <Button
            variant="primary"
            // disabled={selectedNFT === undefined}
            onClick={console.log("finish")}
          >
            완료
          </Button>
        </Col>
      </Row>
    </>
  );
}
