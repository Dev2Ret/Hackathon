import { React } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

const formGroupContainer = {
  "text-align": "left"
}

const formLabelStyle = {
  "margin": "8px 8px"
}

const formControlStyle = {
  "margin-bottom": "24px"
}

export default function RaffleTicket({
  buttonWrapper,
  toRaffleTime,
  toRaffleCheck,
  totalTicketNum,
  setTotalTicketNum,
  ticketPrice,
  setTicketPrice,
}) {

  function checkTotalTicketNum(value) {
    // TODO check whether input is valid or not
    setTotalTicketNum(value);
  }

  function checkTicketPrice(value) {
    // TODO check whether input is valid or not
    setTicketPrice(value);
  }

  return (
    <>
      <h3>Raffle Ticket</h3>

      <Form style={formGroupContainer}>
        <Form.Group controlId="totalTicketNum">
          <Form.Label style={formLabelStyle}>총 티켓 발행량</Form.Label>
          <Form.Control
            style={formControlStyle}
            type="number"
            value={totalTicketNum}
            min={0}
            max={5000}
            onChange={(e) => checkTotalTicketNum(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ticketPrice">
          <Form.Label style={formLabelStyle}>티켓 가격</Form.Label>
          <Form.Control
            style={formControlStyle}
            type="number"
            value={ticketPrice}
            min={0}
            onChange={(e) => checkTicketPrice(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Row className="justify-content-md-center">
        <Col style={buttonWrapper} lg="2">
          <Button variant="primary" onClick={toRaffleTime}>
            이전
          </Button>
        </Col>
        <Col style={buttonWrapper} lg="2">
          <Button
            variant="primary"
            disabled={totalTicketNum <= 0 || ticketPrice <= 0}
            onClick={toRaffleCheck}
          >
            다음
          </Button>
        </Col>
      </Row>
    </>
  );
}