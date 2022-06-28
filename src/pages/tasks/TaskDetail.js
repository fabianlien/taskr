import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/Link";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Task from "../../components/Task";
import CreateTaskItemForm from "./CreateTaskItemForm";

const TaskDetail = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    const onMount = async () => {
        try {
            const { data } = await axiosReq.get(`/tasks/${id}/`)
            setTask(data)
        } catch (error) {
            console.log(error)
        }
    }
    onMount();
  }, [id, setTask, currentUser]);


  return (
    <>
      {currentUser ? (
        <>
          <Task {...task} setTaskData={setTask} taskData={task}/>
          {task.owner === currentUser.username ? <CreateTaskItemForm task_id={id} task={task} setTask={setTask} /> : <></>}
        </>
      ) : (
        <Container>
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>
                <h1>taskr</h1>
              </Card.Title>
              <Card.Text>You must be signed in to view a task.</Card.Text>
              <Card.Text>Get started by creating an account:</Card.Text>
              <Link to="/signup">
                <Button variant="primary">Register</Button>
              </Link>
              <Card.Text>Already have one?</Card.Text>
              <Link to="/signin">
                <Button variant="primary">Sign in</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
};

export default TaskDetail;
