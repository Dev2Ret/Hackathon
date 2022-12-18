import { React, useState } from "react";
import styled from "styled-components";
import { Row, Col, Button, Image } from "react-bootstrap";

const selectedImageStyle = {
  width: "240px",
  height: "240px",
  border: "1px solid blue",
};

const unselectedImageStyle = {
  width: "240px",
  height: "240px",
};

const NFTWrapper = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
};

const MyNFT = styled.div`
  padding: 8px;
  margin: 8px;
  height: 320px;
`;

const NFTName = styled.p`
  padding: 4px;
`;

export default function RaffleNFT({
  buttonWrapper,
  toRaffleTime,
  myNFTs,
  selectedNFT,
  setSelectedNFT,
}) {
  return (
    <>
      <h3>Raffle NFT</h3>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Row className="justify-content-md-center">
            {myNFTs.map(({ id, name }) => {
              let imageStyle = unselectedImageStyle;
              if (selectedNFT !== undefined && selectedNFT.id === id) {
                imageStyle = selectedImageStyle;
              }

              return (
                <Col style={NFTWrapper} kye={id}>
                  <MyNFT
                    onClick={() => {
                      setSelectedNFT({ id: id, name: name });
                    }}
                  >
                    <Image
                      style={imageStyle}
                      src="http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg"
                    />
                    <NFTName>{name}</NFTName>
                  </MyNFT>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col style={buttonWrapper} lg="2">
          <Button
            variant="primary"
            disabled={selectedNFT === undefined}
            onClick={toRaffleTime}
          >
            다음
          </Button>
        </Col>
      </Row>
    </>
  );
}
