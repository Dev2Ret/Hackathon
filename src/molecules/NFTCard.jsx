import {
  Button,
  Card,
  ListGroup,
  Row,
  Col,
  Container,
  Carousel,
  Image,
} from "react-bootstrap";
import logo from "@assets/Logo.svg";
import Web3 from "web3";
import EthereumIcon from "@assets/EthereumIcon";
// import openesea from "@assets/Opensea.svg";

export default function NFTCard({ imageUrl, openseaUrl }) {
  function prevButton() {}
  function nextButton() {}
  function participated() {}
  function uploaded() {}

  console.log("iiii", imageUrl);

  return (
    <>
      <h1>My NFT collections</h1>
      <Container className="container-sm mt-4">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {imageUrl.map((item, ind) => {
            return (
              <Col xs={1} sm={2} md={3} lg={4} key={ind} className="">
                <Card className="bg-secondary bg-gradient rounded-4">
                  <Card.Img className="rounded-4" variant="top" src={item} />
                  <Card.Body className="bg-secondary">
                    <Card.Title>Collection</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>tokenId: {item.tokenId}</ListGroup.Item>
                    {/* <ListGroup.Item>
                      fp: <EthereumIcon />
                    </ListGroup.Item> */}
                  </ListGroup>
                  <Card.Body>
                    <Button>Upload</Button>
                  </Card.Body>
                  <Card.Body>
                    <Card.Link href={openseaUrl[ind]}>
                      {/* <Image src={openesea} width="30"></Image> */}
                    </Card.Link>
                    {/* <Card.Link href="#">Opensea Link</Card.Link> */}
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
