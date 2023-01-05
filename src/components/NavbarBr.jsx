import React from "react";
import "@styles/NavbarBr.css";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "@assets/Logo.svg";
import OnboardingButton from "@molecules/OnboardingButton";

export default function NavbarBr() {
  return (
    <Navbar className="color-nav">
      <Container>
        {/* <Navbar.Brand href="#home"> */}

        <Navbar.Brand>
          <Nav.Link as={Link} to={"/"}>
            <img src={Logo} alt="Logo.svg" />
            DBDB DIP
          </Nav.Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"raffles/eth"}>Raffles</Nav.Link>
          <NavDropdown title="Upload" id="uploadDropdown">
            <Nav.Link as={Link} to={"uploadnft"}>NFTs</Nav.Link>
          </NavDropdown>
          <Nav.Link as={Link} to={"market"}>Market</Nav.Link>
        </Nav>
        <OnboardingButton />        
      </Container>
    </Navbar>
  );
}
