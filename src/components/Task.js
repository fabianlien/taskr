import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/Link";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
 
const Task = (props) => {
  const { id } = useParams(); 
  const history = useHistory();
  const { is_owner, title, is_completed, due_by, description, setTaskData, taskData } =
    props;
  const stringDate = String(due_by)
  const parsedDate = new Date(stringDate.slice(0, 11) + stringDate.slice(12))

  const handleComplete = async () => {
    try {
      const { data } = await axiosReq.put(`/tasks/${id}/`, { ...taskData.results[0], due_by: parsedDate.toISOString(), is_completed: true });
      setTaskData({results: [data]});
      history.push("/");
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
        await axiosRes.delete(`/tasks/${id}/`)
    } catch (error) {
        console.log(error)
    }
    history.push("/");
}

  return (
    <Container>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h3>{title}</h3>
          </Card.Title>
          {is_completed ? <h4>Completed!</h4> : <h4>Task not completed!</h4>}
          <Card.Text>
            <p>{`Due: ${due_by}`}</p>
            <p>{description}</p>
          </Card.Text>
          {is_owner && id ? (
            <Container>
              <span onClick={() => history.goBack()}>*Go Back Icon*</span>
              {!is_completed ? (
                <Button onClick={handleComplete} variant="success">Complete</Button>
              ) : (
                <Link to="/task/create">Create a new task</Link>
              )}
              <Link to={`/task/${id}/update`}>
                <Button variant="warning">Update</Button>
              </Link>
              <Button onClick={handleDelete} variant="warning">Delete</Button>
            </Container>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Task;
