import { React, useState, useEffect } from "react";
import { useAccountsValueContext } from "@contexts/AccountsContext";
import NFTCard from "@molecules/NFTCard"

// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";
import { Spinner } from "react-bootstrap";

export default function Dashboard() {
  const accounts = useAccountsValueContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [metadata, setMetadata] = useState();
  const [fp, setFp] = useState();

  // wallet address from context
  const [address] = useAccountsValueContext();
  const address1 = "0xAff777D14dD576144efE700b83485Ca64388e725";

  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
    // network: Network.ETH_GOERLI
  };
  const alchemy = new Alchemy(settings);

  async function fetchNfts() {
    setIsLoading(true);
      setIsError(false);
      try {
        // Get all NFTs
        const nfts = await alchemy.nft.getNftsForOwner(address1);

        // Get floor price
        // const fp = await alchemy.nft.getFloorPrice(
        //   "0xb18380485f7bA9C23Deb729bEDD3A3499Dbd4449"
        // );

        // const nfts = await alchemy.nft.getNftMetadata()

        // Parse output
        const numNfts = nfts["totalCount"];
        const nftList = nfts["ownedNfts"];

        setMetadata(nftList);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
  }

  useEffect(() => {
    if (accounts.length > 0) {
      // 메타마스크로부터 성공적으로 연결되어 계정을 불러오게 되면 발동
      fetchNfts();
    }
  }, [accounts]);

  function getOpenseaUrl(data) {
    data.map((item, index) => {
      // if (item.contract.openSea.floorPrice >= 0.01) {
      // get collection opensea link
      openseaLink[index] = "https://opensea.io/assets/ethereum/".concat(
        item.contract.address,
        "/" + item.tokenId
      );
      // } else {
      //   openseaLink[index] = undefined;
      // }
    });
    return openseaLink;
  }

  const openseaLink = [];
  const imageUrl = [];

  function getImageUrl(data) {
    data.map((item, index) => {
      // if (item.contract.openSea.floorPrice >= 0.01) {
      // get ipfs image link
      imageUrl[index] = item.contract.openSea.imageUrl;
      // } else {
      //   imageUrl[index] = undefined;
      // }
    });
    return imageUrl;
  }

  if (metadata && accounts.length > 0) {
    return <NFTCard imageUrl={getImageUrl(metadata).filter(Boolean)} openseaUrl={getOpenseaUrl(metadata).filter(Boolean)}/>;
  } else {
    return <Spinner />;
  }
  
}
