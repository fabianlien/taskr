import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "../../styles/ImportantBadge.module.css";

const ImportantBadge = ({big}) => {
  return (
    <Row>
        {console.log(big)}
      {big ? (
        <Col xs={{ span: 2, offset: 11 }} className={styles.BigImportant}>
          <i className="fa-solid fa-exclamation" />
        </Col>
      ) : (
        <Col xs={{ span: 2, offset: 11 }} className={styles.SmallImportant}>
          <i className="fa-solid fa-exclamation" />
        </Col>
      )}
    </Row>
  );
};

export default ImportantBadge;
