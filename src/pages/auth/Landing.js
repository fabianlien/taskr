import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import banner from "../../components/assets/abstract_colorful_pattern.jpg";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const Landing = () => {
  const NavLink = require("react-router-dom").NavLink;
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const onMount = () => {
      if (currentUser) {
        navigate(`/profile/${currentUser.profile_id}`);
      }
    };
    onMount();
  }, [currentUser, navigate]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card align="center">
            <Card.Img variant="top" src={banner} />
            <Card.Body>
              <Card.Title className="display-6">
                Keep track of your progress with taskr.
              </Card.Title>
              <Card.Text className="my-4">
                taskr is a quick and easy to use task manager. It helps you keep
                track of your important tasks and lets you request tasks from
                your friends!
              </Card.Text>
              <Card.Text>Get started by creating an account:</Card.Text>
              <NavLink to="/signup">
                <Button className="mb-3" variant="warning">
                  Register
                </Button>
              </NavLink>
              <Card.Text>Already have one?</Card.Text>
              <NavLink to="/signin">
                <Button className="mb-3" variant="warning">
                  Sign in
                </Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>
            <a href="https://www.freepik.com/vectors/background">
              Background vector created by exnico - www.freepik.com
            </a>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
