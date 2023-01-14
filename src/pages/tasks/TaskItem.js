import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Checkbox from "react-custom-checkbox";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/TaskItem.module.css";

const TaskItem = ({ taskItem, setItemsLoading }) => {
  const { content, id, is_completed, owner, task_id } = taskItem;
  const [checkCompleted] = useState(is_completed);
  const currentUser = useCurrentUser();

  const sendCheck = async (completed) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("is_completed", completed);
    formData.append("task_id", task_id);

    try {
      await axiosReq.put(`/taskitems/${id}/`, formData);
      setItemsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/taskitems/${id}`);
      setItemsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const strikeThroughConditional = (
    <>
      {checkCompleted ? (
        <>
          <Card.Text className={styles.StrikeThrough}>{content}</Card.Text>
        </>
      ) : (
        <Card.Text>{content}</Card.Text>
      )}
    </>
  );

  return (
    <Container fluid className={styles.ItemBox}>
      <Form>
        {currentUser.username === owner ? (
          <Row>
            <Col className={styles.Icon} xs={1}>
              <i className="fa-solid fa-clipboard-list" />
            </Col>
            <Col xs={6}>
              {strikeThroughConditional}
            </Col>
            <Col xs={2}>
              <Checkbox
                name={id}
                checked={checkCompleted}
                borderColor="rgb(211, 94, 94)"
                borderRadius={5}
                icon={<i className="fa-solid fa-check" />}
                size={18}
                aria-label=" Task item checkbox"
                onChange={(value) => {
                  sendCheck(value);
                }}
              />
            </Col>
            <Col xs={1}>
              <Form.Group className={styles.Icon} onClick={handleDelete}>
                <i className="fa-solid fa-xmark" />
              </Form.Group>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className={styles.Icon} xs={1}>
              <i className="fa-solid fa-clipboard-list" />
            </Col>
            <Col xs={8}>
              {strikeThroughConditional}
            </Col>
            <Col xs={2}>
              <Checkbox
                name={id}
                checked={checkCompleted}
                borderColor="rgb(211, 94, 94)"
                borderRadius={5}
                icon={<i className="fa-solid fa-check" />}
                size={18}
                aria-label=" Task item checkbox"
                disabled={true}
              />
            </Col>
          </Row>
        )}
      </Form>
    </Container>
  );
};

export default TaskItem;
