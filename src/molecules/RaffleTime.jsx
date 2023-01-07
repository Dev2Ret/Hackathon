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
  fullyWidenStyle,
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
            if (isMoment(moment)) {
              const now = new Date().getTime();
              const endTime = moment.unix() * 1000;
              if(endTime - (60 * 60 * 1000) > now) {
                setEndTimestamp(moment.unix() * 1000);
              } else {
                setEndTimestamp(undefined);  
              }
            } else {
              setEndTimestamp(undefined);
            }
          }}
        />
      </DatetimeWrapper>

      {/* <Row className="justify-content-md-center"> */}
      <Row>
        <Col style={buttonWrapper}>
          <Button
            style={fullyWidenStyle}
            variant="primary"
            onClick={toRaffleNFT}
          >
            이전
          </Button>
        </Col>
        <Col style={buttonWrapper}>
          <Button
            style={fullyWidenStyle}
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
