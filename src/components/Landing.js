import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-router-dom/NavLink";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    const onMount = () => {
      if (currentUser) {
        history.push(`/profile/${currentUser.profile_id}`);
      }
    };
    onMount();
  }, [currentUser, history]);

  return (
    <Row>
      <Col xs={12}>
        <Card align="center">
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>
              <h1>taskr</h1>
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text>Get started by creating an account:</Card.Text>
            <NavLink to="/signup">
              <Button variant="primary">Register</Button>
            </NavLink>
            <Card.Text>Already have one?</Card.Text>
            <NavLink to="/signin">
              <Button variant="primary">Sign in</Button>
            </NavLink>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Landing;
