import NFTcard from "@molecules/NFTCard";
import React from "react";

import { useState, useEffect } from "react";
import NFTCard from "@molecules/NFTCard";
import { useAccountsValueContext } from "@contexts/AccountsContext";

// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

export default function Market() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [metadata, setMetadata] = useState();

  // wallet address from context
  //   const [address] = useAccountsValueContext();
  const address = "0xCB70Dc414921f4588e14498D26D64e1c44a0857f";

  const settings = {
    apiKey: "",
    // apiKey: ""
    network: Network.ETH_MAINNET,
    // network: Network.ETH_GOERLI
  };
  const alchemy = new Alchemy(settings);

  // Get the latest block
  const latestBlock = alchemy.core.getBlockNumber();

  useEffect(() => {
    async function viewFP() {
      // Print the NFT floor price for a contract
      const fp = await alchemy.nft.getFloorPrice(
        "0xb18380485f7bA9C23Deb729bEDD3A3499Dbd4449"
      );
      console.log(fp);
    }
    viewFP();
  }, []);

  useEffect(() => {
    async function viewMyNFTs() {
      setIsLoading(true);
      setIsError(false);
      try {
        // Get all NFTs
        const nfts = await alchemy.nft.getNftsForOwner(address);
        // const nfts = await alchemy.nft.getNftMetadata()
        // Parse output
        const numNfts = nfts["totalCount"];
        const nftList = nfts["ownedNfts"];

        // console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);

        // let i = 1;

        // for (let nft of nftList) {
        //   // console.log(`${i}. ${nft.title}`);
        //   // i++;
        // }
        // console.log(nfts["ownedNfts"]);
        setMetadata(nfts);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }

    viewMyNFTs();
  }, []);

  return <NFTCard metadata={metadata["ownedNfts"]} />;
}
