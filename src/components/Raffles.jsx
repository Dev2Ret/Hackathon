import { React, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  ToggleButton,
  Stack,
  Spinner,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import EthereumIcon from "@assets/EthereumIcon";
import PolygonIcon from "@assets/PolygonIcon";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { RaffleManagerMeta } from "@eth/contracts/RaffleManagerMeta";
import { RaffleMeta } from "@eth/contracts/RaffleMeta";
import { Contract } from "@eth/Web3";
import { useAccountsValueContext } from "@contexts/AccountsContext";
import { fetchMetadata } from "@services/nft-metadata-fetcher";

const contentBoxStyle = {
  padding: "16px",
  // backgroundColor: "#FFF6DE",
  // marginTop: "10px",
};

const cardTextRightItemStyle = {
  "text-align": "right",
  "font-size": "small"
}

const imageContainer = {
  height: "100%"
}

const imageStyle = {
  width: "100%",
  height: "100%",
  "object-fit": "contain",
};

const cardBodyStyle = {
  "border-top": "1px solid #d2d2d2"
}

export default function Raffles() {
  const navigate = useNavigate();
  const params = useParams();
  const [timeDiffs, setTimeDiffs] = useState([]);

  const chains = [
    { id: 1, symbol: "eth", name: "Ethereum", icon: <EthereumIcon /> },
    // { id: 2, symbol: "matic", name: "Polygon", icon: <PolygonIcon /> },
  ];

  const [raffles, setRaffles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [chain, setChain] = useState();
  const accounts = useAccountsValueContext();

  let index = 0;

  let selectedChain = undefined;

  async function fetchRaffles() {
    setIsLoading(true);
    setIsError(false);
    try {
      const results = await Contract(RaffleManagerMeta)
        .methods.getRafflesByIndex(index, 10)
        .call();

      const raffles = [];
      for(let i=0; i<results.length; i++) {
        const raffle = {
          expiredAt: parseInt(results[i].expiredAt),
          index: parseInt(results[i].index),
          nftContract: results[i].nftContract,
          nftName: results[i].nftName,
          nftSymbol: results[i].nftSymbol,
          nftTokenId: parseInt(results[i].nftTokenId),
          nftTokenType: parseInt(results[i].nftTokenType),
          nftTokenURI: results[i].nftTokenURI,
          owner: results[i].owner,
          raffleContract: results[i].raffleContract,
          soldTickets: parseInt(results[i].soldTickets),
          ticketCap: parseInt(results[i].ticketCap),
          ticketPrice: parseInt(results[i].ticketPrice),
          ticketPricePointer: parseInt(results[i].ticketPricePointer),
          nftMeta: await fetchMetadata(results[i].nftTokenURI)
        };

        raffles.push(raffle);
      }

      console.log("r1 ", raffles);
      
      setRaffles(raffles);
      setIsLoading(false);
    } catch(e) {
      console.log(e)
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedChain !== undefined && chain === undefined) {
      setChain(selectedChain);
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
    return (
      <Container style={contentBoxStyle}>
        <Spinner />
      </Container>
    );
  }

  if (isError) {
    return <p>Error!!</p>;
  }

  function formatTimestamp(timestamp) {
    let dt = new Date(timestamp);
    return (
      dt.getFullYear() +
      "년 " +
      (dt.getMonth() + 1) +
      "월 " +
      dt.getDate() +
      "일 " +
      dt.getHours() +
      "시 " +
      dt.getMinutes() +
      "분"
    );
  }

  function calculateTicketPrice(price, pointer) {
    return price / Math.pow(10, pointer);
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

      {/* <Row xs={1} sm={2} md={3} lg={4} className="g-4"> */}
      <Row xs={1} sm={1} md={2} lg={2} xl={3} xxl={4} className="g-4">
        {raffles.map((raffle) => {
          if (true) {
            // if (raffle.nft.chain.id === selectedChain.id) {
            return (
              <Col>
                <Card style={imageContainer}>
                  <Card.Img
                    variant="top"
                    src={raffle.nftMeta.image}
                    style={imageStyle}
                    className="bg-secondary"
                  />
                  <Card.Body className="bg-secondary" style={cardBodyStyle}>
                    {/* <Card.Title>{raffle.nft.name}</Card.Title> */}
                    <Card.Title>{`${raffle.nftMeta.name}`}</Card.Title>
                    <Card.Text>
                      <Row>
                        <Col xs={4}>종료 시각</Col>
                        <Col xs={8} style={cardTextRightItemStyle}>
                          {formatTimestamp(raffle.expiredAt * 1000)}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={4}>티켓 가격</Col>
                        <Col xs={8} style={cardTextRightItemStyle}>
                          {calculateTicketPrice(
                            raffle.ticketPrice,
                            raffle.ticketPricePointer
                          )}{" "}
                          ETH
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={4}>티켓 현황</Col>
                        <Col
                          xs={8}
                          style={cardTextRightItemStyle}
                        >{`${raffle.soldTickets}/${raffle.ticketCap}`}</Col>
                      </Row>
                    </Card.Text>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(
                            `/raffles/${selectedChain.symbol}/${raffle.raffleContract}`
                          );
                        }}
                      >
                        참가하기
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
