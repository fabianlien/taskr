import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-router-dom/NavLink";
import { useCurrentUser } from "../context/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const SignedOutNav = (
    <>
      <NavLink to="/signin">Sign in</NavLink>
      <NavLink to="/signup">Sign up</NavLink>
    </>
  );
  const SignedInNav = (
    <>
    {currentUser?.username}
    </>
  )

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">taskr</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser ? SignedInNav : SignedOutNav}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
