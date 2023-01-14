import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Detail.module.css";
import TaskItem from "./TaskItem";

const CreateTaskItemForm = (props) => {
  const { task_id } = props;
  const initialState = {
    content: "",
    task_id: task_id,
  };
  const [taskItem, setTaskItem] = useState(initialState);
  const [taskItems, setTaskItems] = useState({ results: [] });
  const [errors, setErrors] = useState({});
  const [itemsLoading, setItemsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = await axiosReq.get(`/taskitems/?task_id=${task_id}`);
        setTaskItems(data);
        setItemsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (itemsLoading) {
      onMount();
    }
  }, [task_id, itemsLoading]);

  const handleChange = (event) => {
    setTaskItem({
      ...taskItem,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", taskItem.content);
    formData.append("task_id", task_id);

    try {
      await axiosReq.post("/taskitems/", formData);
      setItemsLoading(true);
      setTaskItem(initialState);
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) setErrors(error.response?.data);
    }
  };

  const messageTimer = setTimeout(() => {
    setShowMessage(false);
  }, 5000);

  return (
    <Container>
      <Form>
        <Form.Group as={Row} className="mb-4" controlId="content">
          <Form.Label className="d-none">Task item</Form.Label>
          <Col xs={11} lg={10}>
            <Form.Control
              type="text"
              placeholder="Task item"
              name="content"
              value={taskItem.content}
              onChange={handleChange}
            />
          </Col>
          <Col xs={1} lg={2}>
            <Button
              className={styles.AddButton}
              type="button"
              onClick={handleSubmit}
            >
              +
            </Button>
          </Col>
        </Form.Group>
        {errors.content?.length && errors.content?.map((message, index) => (
          <Alert
            className={styles.WarningMessage}
            variant="warning"
            key={index}
            show={showMessage}
          >
            {message}
            <Col className="d-none">
              {messageTimer}
            </Col>
          </Alert>
        ))}
      </Form>
      {itemsLoading && <Spinner animation="border" />}
      {!itemsLoading && taskItems.results.length ? (
        <>
          {taskItems?.results.map((taskItem, index) => {
            return (
              <TaskItem
                key={index}
                taskItem={taskItem}
                setItemsLoading={setItemsLoading}
              />
            );
          })}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CreateTaskItemForm;
