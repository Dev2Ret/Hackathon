import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Stack, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { Contract } from "@eth/Web3";
import { RaffleManagerMeta } from "src/eth/contracts/RaffleManagerMeta";
import { useState } from "react";
import { fetchMetadata } from "@services/nft-metadata-fetcher";
import { useEffect } from "react";
import erc721abi from "@eth/ERC721ABI.json"

const raffleContainer = {
  margin: "10px 0",
  "justify-content": "center"
}

const imageWrapper = {
  width: "422px",
  height: "422px",
  // border: "1px solid black",
};

const contentsContainer = {
  width: "422px",
  height: "422px",
  // border: "1px solid blue",
  padding: "12px",
  "text-align": "left"
};

const imageStyle = {
  width: "100%",
  height: "100%",
  "object-fit": "contain",
};

const contentItemStyle = {
  "white-space": "nowrap",
  "text-overflow": "ellipsis",
  overflow: "hidden",
  "text-align": "right"
};

const contentTitleStyle = {
  "font-size": "small"
}

const spinnerStyle = {
  "position": "absolute",
  "top": "350px"
}

const NFTName = styled.h4`
  margin-bottom: 24px;
  padding: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ContentItem = styled.div `
  padding: 12px;
`;

export default function RaffleCheck({
  fullyWidenStyle,
  buttonWrapper,
  toRaffleTicket,
  selectedNFT,
  endTimestamp,
  totalTicketNum,
  ticketPrice,
  accounts,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState();

  const UNIT = 4;
  const ETH_TO_WEI = 1000000000000000000;

  useEffect(() => {
    async function fetchAndsetImage() {
      const nftMeta = await fetchMetadata(selectedNFT.tokenUri.raw);
      setImageSrc(nftMeta.image);
    }
    fetchAndsetImage();
  }, []);

  let dt = new Date(endTimestamp);
  let stringDt =
    dt.getFullYear() +
    "년 " +
    (dt.getMonth() + 1) +
    "월 " +
    dt.getDate() +
    "일 " +
    dt.getHours() +
    "시 " +
    dt.getMinutes() +
    "분";

  function parseNFTTokenTypeToInt(tokenType) {
    if(tokenType === "ERC721") return 721;
    // else if(tokenType === "ERC1155") return 1155;
    else throw new Error("Not NFT token");
  }

  async function createRaffle() {
    try{
      setIsLoading(true);

      console.log("isloading true");

      let ticketPricePointer = 0;
      let ticketPriceInteger = ticketPrice;

      while (ticketPriceInteger !== Math.floor(ticketPriceInteger)) {
        ticketPricePointer += 1;
        ticketPriceInteger = parseFloat((ticketPriceInteger * 10).toFixed(UNIT));
      }

      const nftMeta = {
        address: selectedNFT.contract.address,
        abi: erc721abi
      }

      const isApprovedForAll = await Contract(nftMeta).methods.isApprovedForAll(
        accounts[0],
        RaffleManagerMeta.address
      ).call();

      console.log("approved", isApprovedForAll)
      if(!isApprovedForAll) {
        await Contract(nftMeta).methods.setApprovalForAll(
          RaffleManagerMeta.address,
          true
        ).send({ from: accounts[0] });
      }

      // const contract = Contract(nftAddress, erc721abi, signer); //signer is B
      // const isApprovedForAll = await contract.isApprovedForAll(
      //   signerAddress,
      //   marketplaceAddress
      // );
      // if (!isApprovedForAll) {
      //   await contract.setApprovalForAll(maketplaceAddress, true);
      // }

      const receipt = await Contract(RaffleManagerMeta)
        .methods.createRaffle(
          selectedNFT.contract.address,
          selectedNFT.tokenId,
          parseNFTTokenTypeToInt(selectedNFT.tokenType),
          parseInt(endTimestamp / 1000),
          totalTicketNum,
          (ticketPrice * ETH_TO_WEI).toString()
        )
        .send({ from: accounts[0] });

      console.log("rs : ", receipt);

      setIsLoading(false);
      console.log("isloading false");

      navigate(
        `/raffles/eth/` +
          receipt.events.NFTRaffleCreated.returnValues.raffleAddress
      );
    } catch(e) {
      setIsLoading(false);
      console.log("failed to create: ", e);
    }

    // .then((receipt) => {
    //   navigate(
    //     `/raffles/eth/` +
    //       receipt.events.NFTRaffleCreated.returnValues.raffleAddress
    //   );
    // });
  }

  return (
    <>
      <h3>래플 확인</h3>
      {isLoading ? (
        <Spinner animation="border" role="status" style={spinnerStyle}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : null}
      <Row className="justify-content-md-center" style={raffleContainer}>
        <Col style={imageWrapper} lg="2">
          <Image style={imageStyle} src={imageSrc} />
        </Col>
        <Col style={contentsContainer} lg="2">
          <NFTName>{`${selectedNFT.title}`}</NFTName>
          <Stack gap={4}>
            <ContentItem className="bg-light border">
              <Row>
                <Col sm={4} style={contentTitleStyle}>
                  종료 시간
                </Col>
                <Col sm={8} style={contentItemStyle}>
                  {stringDt}
                </Col>
              </Row>
            </ContentItem>
            <ContentItem className="bg-light border">
              <Row>
                <Col sm={4} style={contentTitleStyle}>
                  총 티켓 발행량
                </Col>
                <Col sm={8} style={contentItemStyle}>
                  {totalTicketNum}
                </Col>
              </Row>
            </ContentItem>
            <ContentItem className="bg-light border">
              <Row>
                <Col sm={4} style={contentTitleStyle}>
                  티켓 가격
                </Col>
                <Col sm={8} style={contentItemStyle}>
                  {`${ticketPrice} ETH`}
                </Col>
              </Row>
            </ContentItem>
            <ContentItem className="bg-light border">
              <Row>
                <Col sm={4} style={contentTitleStyle}>
                  NFT 컨트랙트
                </Col>
                <Col sm={8} style={contentItemStyle}>
                  {selectedNFT.contract.address}
                </Col>
              </Row>
            </ContentItem>
          </Stack>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col style={buttonWrapper}>
          <Button
            style={fullyWidenStyle}
            variant="primary"
            disabled={isLoading}
            onClick={toRaffleTicket}
          >
            이전
          </Button>
        </Col>
        <Col style={buttonWrapper}>
          <Button
            style={fullyWidenStyle}
            variant="primary"
            disabled={isLoading}
            onClick={createRaffle}
          >
            완료
          </Button>
        </Col>
      </Row>
    </>
  );
}
