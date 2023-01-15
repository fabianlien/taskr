import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useCurrentUser, useSetCurrentUser } from "../../context/CurrentUserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/NavBar.module.css";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  
  
  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/')
      setCurrentUser(null)
    } catch (error) {
      console.log(error)
    }
    navigate("/");
  };

  const SignedOutNav = (
    <>
      <Link to="/signin" className={`${styles.Link} ${styles.NavLink}`}>Sign in</Link>
      <Link to="/signup" className={`${styles.Link} ${styles.NavLink}`}>Sign up</Link>
    </>
  );
  const SignedInNav = (
    <>
      <Navbar.Text className="p-lg-2">Logged in as {currentUser?.username}</Navbar.Text>
      <Link to="/" className={`${styles.Link} ${styles.NavLink}`} onClick={handleSignOut}>Sign Out</Link>
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
