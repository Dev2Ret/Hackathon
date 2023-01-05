import { React } from "react";
import styled from "styled-components";
import { Row, Col, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { isMoment } from "moment/moment";

const DatetimeWrapper = styled.div`
  margin: 30px 8px;
`;

export default function RaffleTime({
  buttonWrapper,
  toRaffleNFT,
  toRaffleTicket,
  endTimestamp,
  setEndTimestamp,
}) {

  const initDate = new Date(endTimestamp);

  return (
    <>
      <h3>Raffle Time</h3>
      <DatetimeWrapper>
        <Datetime
          initialValue={initDate}
          dateFormat="YYYY-MM-DD"
          onChange={(moment) => {
            if(isMoment(moment)) {
              setEndTimestamp(moment.unix() * 1000);
            } else {
              setEndTimestamp(undefined);
            }
          }}
        />
      </DatetimeWrapper>

      <Row className="justify-content-md-center">
        <Col style={buttonWrapper} lg="2">
          <Button
            variant="primary"
            onClick={toRaffleNFT}
          >
            이전
          </Button>
        </Col>
        <Col style={buttonWrapper} lg="2">
          <Button
            variant="primary"
            disabled={endTimestamp === undefined}
            onClick={toRaffleTicket}
          >
            다음
          </Button>
        </Col>
      </Row>
    </>
  );
}
