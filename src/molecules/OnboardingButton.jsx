import MetaMaskOnboarding from "@metamask/onboarding";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAccountsContext } from "@contexts/AccountsContext";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

const IconButtonStyle = {
  "background-color": "transparent",
  border: "transparent",
};

export default function OnboardingButton() {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useAccountsContext();
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
      console.log(onboarding.current);
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        setConnected(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
        setConnected(false);
      }
    }
  }, [accounts]);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => {
          setAccounts(newAccounts);
        });
    } else {
      onboarding.current.startOnboarding();
    }
  };

  if (connected) {
    return (
      <>
        {/* <FaUserCircle size={36}>

          <Button size="lg" style={IconButtonStyle}></Button>

        </FaUserCircle> */}
        <Button size="lg" style={IconButtonStyle} onClick={() => {
          navigate(`/dashboard`);
        }}>
          <FaUserCircle className="text-primary" size={44} />
          {/* <FaUserCircle size={36} /> */}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button disabled={isDisabled} onClick={onClick}>
          {buttonText}
        </Button>
      </>
    );
  }
}
