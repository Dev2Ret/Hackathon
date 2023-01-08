import RaffleNFT from "@molecules/RaffleNFT";
import RaffleTime from "@molecules/RaffleTime";
import RaffleTicket from "@molecules/RaffleTicket";
import RaffleCheck from "@molecules/RaffleCheck";
import Container from "react-bootstrap/Container";
import { React, useState } from "react";
import { useAccountsValueContext } from "@contexts/AccountsContext";

const contentBoxStyle = {
  padding: "16px",
  backgroundColor: "#FFF6DE",
  marginTop: "50px",
  // width: "fit-content",
};

const buttonWrapper = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
};

const fullyWidenStyle = {
  width: "100%"
}

export default function UploadNFT() {
  const accounts = useAccountsValueContext();
  const [uploadStep, setUploadStep] = useState(1);
  const [selectedNFT, setSelectedNFT] = useState(undefined);
  const [endTimestamp, setEndTimestamp] = useState(undefined);
  const [totalTicketNum, setTotalTicketNum] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);

  const myNFTs = [
    { id: 1, name: "COOL CAT #6337" },
    { id: 2, name: "DOODLE #8761" },
    { id: 3, name: "MAYC #18144" },
    { id: 4, name: "KITARO #4515" },
  ];

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
      <Container
        style={contentBoxStyle}>
        { accounts.length < 1 ? (
          <p>지갑이 연결되어 있지 않습니다.</p>
        ) :
        uploadStep === 1 ? (
          <RaffleNFT
            fullyWidenStyle={fullyWidenStyle}
            buttonWrapper={buttonWrapper}
            toRaffleTime={toRaffleTime}
            myNFTs={myNFTs}
            selectedNFT={selectedNFT}
            setSelectedNFT={setSelectedNFT}
          />
        ) : uploadStep === 2 ? (
          <RaffleTime
            fullyWidenStyle={fullyWidenStyle}
            buttonWrapper={buttonWrapper}
            toRaffleNFT={toRaffleNFT}
            toRaffleTicket={toRaffleTicket}
            endTimestamp={endTimestamp}
            setEndTimestamp={setEndTimestamp}
          />
        ) : uploadStep === 3 ? (
          <RaffleTicket
            fullyWidenStyle={fullyWidenStyle}
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
            fullyWidenStyle={fullyWidenStyle}
            buttonWrapper={buttonWrapper}
            toRaffleTicket={toRaffleTicket}
            selectedNFT={selectedNFT}
            endTimestamp={endTimestamp}
            totalTicketNum={totalTicketNum}
            ticketPrice={ticketPrice}
            accounts={accounts}
          />
        ) : null}
      </Container>
    </>
  );
}
