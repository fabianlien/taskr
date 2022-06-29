import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../context/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password  } = signInData;
  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("dj-rest-auth/login/", signInData);
      setCurrentUser(data.user)
      history.push("/");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row>
      <Col className="my-auto py-2 p-md-2 offset-md-3" md={6}>
        <Container className="p-5">
          <h1>sign in</h1>
          <Form onSubmit={handleSubmit} name="username">
            <Form.Group className="py-2" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <Form.Group className="py-2" controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <Button className="mt-3" variant="success" type="submit">
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className="mt-3">
          <Link to="/signup">
            Not registered yet? <span>Sign Up</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignInForm;
