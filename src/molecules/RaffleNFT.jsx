import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col, Button, Image, Spinner } from "react-bootstrap";
import { Alchemy, Network } from "alchemy-sdk";
import { useAccountsValueContext } from "@contexts/AccountsContext";
import { RaffleManagerMeta } from "@eth/contracts/RaffleManagerMeta";
import { Contract } from "@eth/Web3";
import { fetchMetadata } from "@services/nft-metadata-fetcher";
import RaffleState from "@assets/RaffleState";

const selectedImageStyle = {
  width: "240px",
  height: "240px",
  border: "10px inset #adb5bd",
  "object-fit": "contain",
};

const unselectedImageStyle = {
  width: "240px",
  height: "240px",
  "object-fit": "contain",
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
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
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
          // Get all NFTs by account
          const nfts = await alchemy.nft.getNftsForOwner(accounts[0]);
          // Parse output
          // const numNfts = nfts["totalCount"];
          // const nftList = nfts["ownedNfts"];
        
          const listedNfts = await Contract(RaffleManagerMeta)
            .methods.getRaffleNFTsByOwner(accounts[0])
            .call();

          // const unlistedNfts = nfts["ownedNfts"];
          const unlistedNfts = nfts["ownedNfts"].filter((nft) => {
            for(let listedNft of listedNfts) {
              if(parseInt(listedNft.state) !== RaffleState.Ongoing) {
                return true;
              }
              if (
                nft.tokenId.localeCompare(listedNft.tokenId) === 0 &&
                nft.contract.address
                  .toLowerCase()
                  .localeCompare(listedNft.contractAddress.toLowerCase()) ===
                  0
              ) {
                return false;
              }
            }
            return true;
          })

          for(let i=0; i<unlistedNfts.length; i++) {
            const nftMeta = await fetchMetadata(unlistedNfts[i].tokenUri.raw);
            unlistedNfts[i].imageSrc = nftMeta.image;
          }

          setNfts(unlistedNfts);

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
    return <Spinner />;
  }

  if (isError) {
    return <p>Error!!</p>;
  }

  if(nfts.length < 1) {
    return <p>래플에 등록가능한 소유중인 NFT가 없습니다.</p>
  }

  return (
    <>
      <h3>나의 NFT</h3>

      <Row className="justify-content-md-center">
        <Col md="auto">
          {/* {nfts.filter((unfilteredNft) => !unfilteredNft['listed']).map((nft) => { */}
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
                      src={nft.imageSrc}
                    />
                    {/* <NFTName>{nft.contract.name + " #" + nft.tokenId}</NFTName> */}
                    <NFTName>{nft.title}</NFTName>
                  </MyNFT>
                </Col>
              );
            })}

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
