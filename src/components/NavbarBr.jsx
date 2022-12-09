import React from "react";
import "@styles/NavbarBr.css";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "@assets/Logo.svg";
import OnboardingButton from "@molecules/OnboardingButton";

export default function NavbarBr() {
  return (
    <Navbar className="color-nav">
      <Container>
        {/* <Navbar.Brand href="#home"> */}
        <Navbar.Brand>
          <NavLink to={`/`}>
            <img src={Logo} alt="Logo.svg" />
            DBDB DIP
          </NavLink>
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to={`raffles`}>Raffles</NavLink>
          <NavDropdown title="Upload" id="uploadDropdown">
            <NavLink to={`uploadnft`}>NFTs</NavLink>
          </NavDropdown>
          <NavLink to={`market`}>Market</NavLink>
        </Nav>
        <OnboardingButton />
      </Container>
    </Navbar>
  );
}
