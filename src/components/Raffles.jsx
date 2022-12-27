import { React, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  ToggleButton,
  Stack
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import EthereumIcon from "@assets/EthereumIcon";
import PolygonIcon from "@assets/PolygonIcon";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const contentBoxStyle = {
  padding: "16px",
  // backgroundColor: "#FFF6DE",
  // marginTop: "10px",
};

export default function Raffles() {

  const navigate = useNavigate();
  const params = useParams();

  const chains = [
    { id: 1, symbol: "eth", name: "Ethereum", icon: <EthereumIcon /> },
    { id: 2, symbol: "matic", name: "Polygon", icon: <PolygonIcon /> },
  ];

  const [raffles, setRaffles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [chain, setChain] = useState();

  let selectedChain = undefined;

  useEffect(() => {

    if (selectedChain !== undefined && chain === undefined) {
      setChain(selectedChain);
    }

    async function fetchRaffles() {
      setIsLoading(true);
      setIsError(false);
      try {
        const results = await axios("http://localhost:3000/api/raffles/");
        setRaffles(results.data);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchRaffles();
  }, [chain]);

  let filteredChains = chains.filter((chain) => {
    if (chain.symbol === params.chain) {
      return chain;
    }
  });

  if (filteredChains.length > 0) {
    selectedChain = filteredChains[0];
  } else {
    return (
      <p>
        Not matched chain such as <code>{params.chain}</code>
      </p>
    );
  }

  const IconWrapper = styled.div`
    /* display: block;
    float: left; */
    width: 36px;
    height: 36px;
  `;

  const NameWrapper = styled.div`
    /* display: block;
    float: left; */
    height: 36px;
    width: 80px;
  `;

  const chainContainer = {
    float: "left",
  };

  const filterLayerStyle = {
    margin: "12px 0",
  };

  const dropdownToggleStyle = {
    width: "200px",
  };

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>Error!!</p>;
  }

  return (
    <Container style={contentBoxStyle}>
      <Stack direction="horizontal" style={filterLayerStyle}>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-basic"
            style={dropdownToggleStyle}
          >
            <Stack direction="horizontal" style={chainContainer}>
              <IconWrapper>{selectedChain.icon}</IconWrapper>
              <NameWrapper>{selectedChain.name}</NameWrapper>
            </Stack>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {chains.map((chain) => {
              if (chain.id !== selectedChain.id) {
                return (
                  <Dropdown.Item
                    onClick={() => {
                      navigate(`/raffles/` + chain.symbol);
                      setChain(chain.symbol);
                    }}
                  >
                    <Stack direction="horizontal">
                      <IconWrapper>{chain.icon}</IconWrapper>
                      <NameWrapper>{chain.name}</NameWrapper>
                    </Stack>
                  </Dropdown.Item>
                );
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Stack>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {raffles.map((raffle, idx) => {
          if (raffle.nft.chain.id === selectedChain.id) {
            return (
              <Col>
                <Card>
                  <Card.Img
                    variant="top"
                    src="http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg"
                  />
                  <Card.Body className="bg-secondary">
                    <Card.Title>{raffle.nft.name}</Card.Title>
                    <Card.Text>
                      Chain: {raffle.nft.chain.symbol} <br />
                      Ticket Price: {raffle.ticketPrice} <br />
                      Total Tickets: {raffle.totalTicketNum} <br />
                    </Card.Text>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/raffles/` +
                              selectedChain.symbol +
                              `/` +
                              raffle.contractId
                          );
                        }}
                      >
                        참여하기
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          }
        })}
      </Row>
    </Container>
  );
}
