import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Detail.module.css";

const CreateTaskItemForm = (props) => {
  const { task_id, setTask, task } = props;
  const initialState = {
    content: "",
    task_id: task_id,
  };
  const [taskItem, setTaskItem] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setTaskItem({
      ...taskItem,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", taskItem.content);
    formData.append("task_id", task_id);

    try {
      await axiosReq.post("/taskitems/", formData);
      setTaskItem(initialState);
      setTask(task);
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) setErrors(error.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="content">
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
          <Button className={styles.AddButton} type="submit">
            +
          </Button>
        </Col>
      </Form.Group>
      {errors.content?.map((message, index) => (
        <Alert className="mt-1" variant="warning" key={index}>
          {message}
        </Alert>
      ))}
    </Form>
  );
};

export default CreateTaskItemForm;
