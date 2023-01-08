import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col, Button, Image } from "react-bootstrap";
import { Alchemy, Network } from "alchemy-sdk";
import { useAccountsValueContext } from "@contexts/AccountsContext";

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
  fullyWidenStyle,
  buttonWrapper,
  toRaffleTime,
  myNFTs,
  selectedNFT,
  setSelectedNFT,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nfts, setNfts] = useState([]);
  const accounts = useAccountsValueContext();

  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_GOERLI_API_KEY,
    // network: Network.ETH_MAINNET,
    network: Network.ETH_GOERLI,
  };
  const alchemy = new Alchemy(settings);

  useEffect(() => {
    if (accounts.length > 0) {
      console.log("connected!!!");

      async function viewMyNFTs() {
        setIsLoading(true);
        setIsError(false);
        try {
          // Get all NFTs
          const nfts = await alchemy.nft.getNftsForOwner(accounts[0]);
          // Parse output
          // const numNfts = nfts["totalCount"];
          // const nftList = nfts["ownedNfts"];
          console.log("rrrrrrrrrrrrr2222", nfts);

          setNfts(nfts["ownedNfts"]);

          setIsLoading(false);
        } catch {
          setIsError(true);
          setIsLoading(false);
        }
      }
      viewMyNFTs();
    }
  }, [accounts]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>Error!!</p>;
  }

  return (
    <>
      <h3>Raffle NFT</h3>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Row className="justify-content-md-center">
            {nfts.map((nft) => {
              let imageStyle = unselectedImageStyle;
              if (
                selectedNFT !== undefined &&
                selectedNFT.tokenId === nft.tokenId &&
                selectedNFT.contract.address === nft.contract.address
              ) {
                imageStyle = selectedImageStyle;
              }

              return (
                <Col
                  style={NFTWrapper}
                  kye={nft.contract.address + nft.tokenId}
                >
                  <MyNFT
                    onClick={() => {
                      setSelectedNFT(nft);
                    }}
                  >
                    <Image
                      style={imageStyle}
                      // TODO ipfs로 부터 이미지 가져오는 방법 해결 후 대체
                      src="http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg"
                      // src={nft.tokenUri.raw}
                      // src={nft.tokenUri.gateway}
                    />
                    <NFTName>{nft.contract.name + " #" + nft.tokenId}</NFTName>
                  </MyNFT>
                </Col>
              );
            })}

            {/* {myNFTs.map(({ id, name }) => {
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
            })} */}
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col style={buttonWrapper}>
          <Button
            style={fullyWidenStyle}
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
