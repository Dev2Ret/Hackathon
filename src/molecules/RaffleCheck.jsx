import { React } from "react";
import { Row, Col, Button } from "react-bootstrap";

export default function RaffleCheck({ buttonWrapper, toRaffleTicket }) {
  return (
    <>
      <h3>Raffle Check</h3>
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
            onClick={console.log('finish')}
          >
            완료
          </Button>
        </Col>
      </Row>
    </>
  );
}
