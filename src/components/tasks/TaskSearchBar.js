import React from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "../../styles/TaskSearchBar.module.css";

const TaskSearchBar = ({ taskSearchQuery, setTaskSearchQuery }) => {
  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <Row>
        <Col xs={1}>
          <div className={styles.MagnifyingGlass}>
            <i className="fa-solid fa-magnifying-glass" />
          </div>
        </Col>
        <Col xs={10}>
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            value={taskSearchQuery}
            onChange={(event) => setTaskSearchQuery(event.target.value)}
            className={styles.SearchBar}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default TaskSearchBar;
