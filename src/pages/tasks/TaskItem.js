import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/TaskItem.module.css";

const TaskItem = ({ taskItem }) => {
  const { content, id, is_completed, owner } = taskItem;
  const [checkCompleted, setCheckCompleted] = useState(is_completed);
  const currentUser = useCurrentUser();

  const toggleBool = (value) => !value;

  const sendCheck = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("is_completed", checkCompleted);
    formData.append("task_id", id);

    try {
      await axiosReq.put(`/taskitems/${id}/`, formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/taskitems/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className={styles.ItemBox}>
      <Form>
        {currentUser.username === owner ? (
          <Row>
            <Col xs={9}>
              <Card.Text>
                <i className="fa-solid fa-clipboard-list"></i>
                {content}
              </Card.Text>
            </Col>
            <Col xs={2}>
              <Form.Check
                type="switch"
                name="priority"
                checked={checkCompleted}
                onChange={(event) => {
                  setCheckCompleted(toggleBool);
                  sendCheck(event.target.checked);
                }}
              />
            </Col>
            <Col xs={1}>
              <Form.Group onClick={handleDelete}>
                <i className="fa-solid fa-xmark"></i>
              </Form.Group>
            </Col>
          </Row>
        ) : (
          <Form.Check type="switch" name="priority" checked={checkCompleted} />
        )}
      </Form>
    </Container>
  );
};

export default TaskItem;
