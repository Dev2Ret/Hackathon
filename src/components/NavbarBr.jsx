import React from "react";
import "@styles/NavbarBr.css";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import Logo from "@assets/Logo.svg";
import OnboardingButton from "@molecules/OnboardingButton";

export default function NavbarBr() {
  return (
    <Navbar className="color-nav">
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} alt="Logo.svg" />
          DBDB DIP
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#raffle">Raffle</Nav.Link>
          <NavDropdown title="Upload" id="uploadDropdown">
            <NavDropdown.Item href="#NFTs">NFTs</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#market">Market</Nav.Link>
        </Nav>
        <OnboardingButton />
      </Container>
    </Navbar>
  );
}
