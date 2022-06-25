import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-router-dom/NavLink";
import { useCurrentUser, useSetCurrentUser } from "../context/CurrentUserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  
  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/')
      setCurrentUser(null)
    } catch (error) {
      console.log(error)
    }
  };

  const SignedOutNav = (
    <>
      <NavLink to="/signin">Sign in</NavLink>
      <NavLink to="/signup">Sign up</NavLink>
    </>
  );
  const SignedInNav = (
    <>
      <h5>Logged in as {currentUser?.username}</h5>
      <NavLink to="/" onClick={handleSignOut}>Sign Out</NavLink>
    </>
  )

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/"><h1>taskr</h1></Link>
        </Navbar.Brand>
          <Nav className="me-auto">
            {currentUser ? SignedInNav : SignedOutNav}
          </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
