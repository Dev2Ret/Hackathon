import { Button, Card, ListGroup, Row, Col, Container } from "react-bootstrap";
import "@styles/Mintcard.css";
import logo from "@assets/Logo.svg";
import Web3 from "web3";
import EthereumIcon from "@assets/EthereumIcon";

export default function NFTCard({ metadata }) {
  console.log(metadata);
  return (
    <>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {metadata.map((item) => {
            return (
              <Col className="g-4">
                <Card
                  className="bg-primary bg-gradient rounded-4 g-4"
                  style={{ width: "18rem" }}
                  key={item}
                >
                  <Card.Img variant="top" src={logo} />
                  <Card.Body className="bg-secondary">
                    <Card.Title>{}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>tokenId: {item.tokenId}</ListGroup.Item>
                    <ListGroup.Item>
                      fp: <EthereumIcon />
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button>Upload</Button>
                  </Card.Body>
                  <Card.Body>
                    <Card.Link href="#">Opensea Link</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
