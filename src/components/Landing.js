import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-router-dom/NavLink";
import banner from "./assets/abstract_colorful_pattern.jpg";
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
    <div>
      <Row>
        <Col xs={12}>
          <Card align="center">
            <Card.Img variant="top" src={banner} />
            <Card.Body>
              <Card.Title className="display-6">
                Keep track of your progress with taskr.
              </Card.Title>
              <Card.Text className="my-4">
                <h4>
                  taskr is a quick and easy to use task manager. It helps you
                  keep track of your important tasks and lets you request tasks
                  from your friends!
                </h4>
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
    </div>
  );
};

export default Landing;
