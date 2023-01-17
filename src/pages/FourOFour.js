import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../styles/FourOFour.module.css";

const FourOFour = () => {
  const navigate = useNavigate();

  return (
    <Container className={styles.Container}>
      <Card.Header className={styles.Heading}>
        Sorry, the page could not be found!
      </Card.Header>
      <Card.Body className={styles.FourOFourCard}>
        ...Looks like you got the ol'{" "}
        <strong style={{ color: "rgb(211, 94, 94)" }}>4</strong>
        <strong style={{ color: "rgb(255, 196, 0)" }}>o</strong>
        <strong style={{ color: "rgb(85, 117, 91)", fontSize: "190%" }}>
          4
        </strong>
        !
        <Row>
          <Card.Text className={styles.Heading} onClick={() => navigate(-1)}>
            <i className="fa-solid fa-rotate-left" />
          </Card.Text>
        </Row>
      </Card.Body>
    </Container>
  );
};

export default FourOFour;
