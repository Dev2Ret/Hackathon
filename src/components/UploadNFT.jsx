import RaffleNFT from "@molecules/RaffleNFT";
import RaffleTime from "@molecules/RaffleTime";
import RaffleTicket from "@molecules/RaffleTicket";
import RaffleCheck from "@molecules/RaffleCheck";
import Container from "react-bootstrap/Container";
import { React, useState } from "react";

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
