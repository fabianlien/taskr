import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-router-dom/NavLink";
import { useCurrentUser, useSetCurrentUser } from "../context/CurrentUserContext";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  
  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/')
      setCurrentUser(null)
    } catch (error) {
      console.log(error)
    }
    history.push("/");
  };

  const SignedOutNav = (
    <>
      <NavLink to="/signin" className={`${styles.Link} ${styles.NavLink}`}>Sign in</NavLink>
      <NavLink to="/signup" className={`${styles.Link} ${styles.NavLink}`}>Sign up</NavLink>
    </>
  );
  const SignedInNav = (
    <>
      <Navbar.Text className="p-lg-2">Logged in as {currentUser?.username}</Navbar.Text>
      <NavLink to="/" className={`${styles.Link} ${styles.NavLink}`} onClick={handleSignOut}>Sign Out</NavLink>
    </>
  )

  return (
    <Navbar bg="light" expand="lg" >
      <Container>
        <Navbar.Brand>
          <Link to="/" className={styles.Link}>
            <h1 className={styles.Brand}>taskr</h1>
          </Link>
        </Navbar.Brand>
          <Nav>
              {currentUser ? SignedInNav : SignedOutNav}
          </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
