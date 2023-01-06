import RaffleNFT from "@molecules/RaffleNFT";
import RaffleTime from "@molecules/RaffleTime";
import RaffleTicket from "@molecules/RaffleTicket";
import RaffleCheck from "@molecules/RaffleCheck";
import Container from "react-bootstrap/Container";
import { React, useState } from "react";
import { ConnectedWeb3, Contract, SelectedAddress } from "@eth/Web3";
import ERC721ABI from "@eth/ERC721ABI"
import { useEffect } from "react";
import { useContext } from "react";
import { AccountContext } from "@contexts/AccountContext";

const contentBoxStyle = {
  padding: "16px",
  backgroundColor: "#FFF6DE",
  marginTop: "50px"
};

const buttonWrapper = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center"
}

export default function UploadNFT() {

  const accounts = useContext(AccountContext);

  // let account = ConnectedWeb3().eth.givenProvider.SelectedAddress;


  // useEffect(() => {
  //   console.log("accounts", accounts);
  // }, [accounts]);

  // console.log(SelectedAddress());

  // // console.log("ddddddddd", ConnectedWeb3());
  // // ConnectedWeb3.eth.getBalance(SelectedAddress);
  // const web3 = ConnectedWeb3();
  // // console.log(web3.eth.getBalance)
  // // console.log(SelectedAddress())
  // web3.eth.getBalance("0x09f6cb5796d1aa7f731aaddbd0a68a7660ffce86").then((rs) => {
  //   web3.eth.toDecimal(rs);
  //   console.log(rs);
  // })
  // // console.log("balance", balance);


  // const tokenContract = "0x317a8Fe0f1C7102e7674aB231441E485c64c178A";
  // const contract = Contract({abi: ERC721ABI, address: tokenContract });

  // async function getNFTMetadata() {
  //   const result = await contract.methods.tokenURI(254833).call();

  //   console.log(result);
  // }

  // getNFTMetadata();

  const myNFTs = [
    { id: 1, name: "COOL CAT #6337" },
    { id: 2, name: "DOODLE #8761" },
    { id: 3, name: "MAYC #18144" },
    { id: 4, name: "KITARO #4515" },
  ];

  const [uploadStep, setUploadStep] = useState(1);
  const [selectedNFT, setSelectedNFT] = useState(undefined);
  const [endTimestamp, setEndTimestamp] = useState(undefined);
  const [totalTicketNum, setTotalTicketNum] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);

  function toRaffleNFT() {
    setUploadStep(1);
  }
  
  function toRaffleTime() {
    setUploadStep(2);
  }

  function toRaffleTicket() {
    setUploadStep(3);
  }

  function toRaffleCheck() {
    setUploadStep(4);
  }

  return (
    <>
      <Container style={contentBoxStyle}>
        <p>{accounts}</p>
        {uploadStep === 1 ? (
          <RaffleNFT
            buttonWrapper={buttonWrapper}
            toRaffleTime={toRaffleTime}
            myNFTs={myNFTs}
            selectedNFT={selectedNFT}
            setSelectedNFT={setSelectedNFT}
          />
        ) : uploadStep === 2 ? (
          <RaffleTime
            buttonWrapper={buttonWrapper}
            toRaffleNFT={toRaffleNFT}
            toRaffleTicket={toRaffleTicket}
            endTimestamp={endTimestamp}
            setEndTimestamp={setEndTimestamp}
          />
        ) : uploadStep === 3 ? (
          <RaffleTicket
            buttonWrapper={buttonWrapper}
            toRaffleTime={toRaffleTime}
            toRaffleCheck={toRaffleCheck}
            totalTicketNum={totalTicketNum}
            setTotalTicketNum={setTotalTicketNum}
            ticketPrice={ticketPrice}
            setTicketPrice={setTicketPrice}
          />
        ) : uploadStep === 4 ? (
          <RaffleCheck
            buttonWrapper={buttonWrapper}
            toRaffleTicket={toRaffleTicket}
            selectedNFT={selectedNFT}
            endTimestamp={endTimestamp}
            totalTicketNum={totalTicketNum}
            ticketPrice={ticketPrice}
          />
        ) : null}
      </Container>
    </>
  );
}
