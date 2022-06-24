import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/Link";
import { useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";

const Task = (props) => {
  const { id } = useParams();  
  const { is_owner, title, is_completed, due_by, description, is_important, setTaskData, taskData } =
    props;

  const handleComplete = async () => {
    try {
      await axiosReq.put(`/tasks/${id}/`, { ...taskData, is_completed: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h3>{title}</h3>
          </Card.Title>
          <Card.Text>
            <h5>{`Due: ${due_by}`}</h5>
            <p>{description}</p>
          </Card.Text>
          {is_owner ? (
            <Container>
              <Button onClick={handleComplete} variant="success">Complete</Button>
              <Link to={`/task/${id}/update`}>
                <Button variant="warning">Update</Button>
              </Link>
              <Button variant="warning">Delete</Button>
            </Container>
          ) : is_completed ? (
            <h2>Completed!</h2>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Task;