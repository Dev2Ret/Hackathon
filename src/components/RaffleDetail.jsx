import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Container, Image, Button, Stack } from "react-bootstrap";
import styled from "styled-components";

const leftItemStyle = {
  backgroundColor: "red",
  padding: "8px",
};

const rightItemStyle = {
  // backgroundColor: "blue",
  padding: "0",
};

const contentsContainer = {
  height: "100%"
}

const containerWrapper = {
  "margin-top": "20px"
}

const imageStyle = {
  width: "100%",
  height: "100%",
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

const TimeContainer = styled.div``;

const TicketsContainer = styled.div``;

const TicketPriceContainer = styled.div``;

const ContractAddressContainer = styled.div``;

export default function RaffleDetail() {

  const [raffle, setRaffle] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);

  const params = useParams();

  useEffect(() => {
    const id = setInterval(() => {
      if(raffle !== undefined) {
        const date = new Date();
        let timeDiffSecs = raffle.ended - parseInt(date.getTime() / 1000);
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
        const results = await axios(
          "http://localhost:3000/api/raffles/" + params.contractId
        );
        setRaffle(results.data);
        setIsLoading(false);
      } catch {
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
        <Row className="justify-content-md-center">
          <Col sm={4} style={leftItemStyle}>
            <Image
              style={imageStyle}
              src="http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg"
            />
          </Col>
          <Col sm={4} style={rightItemStyle} className="bg-info">
            <Stack style={contentsContainer}>
              <RaffleContentsHeader>{raffle.nft.name}</RaffleContentsHeader>
              <RaffleContentsBody>
                <TimeContainer>
                  남은 시간 : {findTimeDiffInDays(timeDiff)}일{" "}
                  {findTimeDiffInHours(timeDiff)}시{" "}
                  {findTimeDiffInMins(timeDiff)}분{" "}
                  {findTimeDiffInSecs(timeDiff)}초{" "}
                </TimeContainer>
                <TicketsContainer>
                  남은 티켓 수량 : {raffle.totalTicketNum}
                </TicketsContainer>
                <TicketPriceContainer>
                  티켓 가격 : {raffle.ticketPrice}
                </TicketPriceContainer>
                <ContractAddressContainer>
                  컨트랙트 주소 : 0x1234567890abcdef
                </ContractAddressContainer>
              </RaffleContentsBody>
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