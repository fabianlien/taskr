import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/TaskSearchBar.module.css";

const TaskSearchBar = ({
  setTasksFiltered,
  taskSearchQuery,
  setTaskSearchQuery,
}) => {
  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?search=${taskSearchQuery}`
        );
        if (taskSearchQuery.length) {
          setTasksFiltered(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const searchTimer = setTimeout(() => {
      fetchQuery();
    }, 800);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [taskSearchQuery, setTasksFiltered]);

  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <Row>
        <Col xs={1}>
          <div className={styles.MagnifyingGlass}><i className="fa-solid fa-magnifying-glass"></i></div>
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
