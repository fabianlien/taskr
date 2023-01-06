import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import TaskItem from "../../pages/tasks/TaskItem.js";
import { Link, useHistory, useParams } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults.js";
 
const Task = (props) => {
  const { id } = useParams(); 
  const history = useHistory();
  const { is_owner, title, is_completed, due_by, description, setTaskData, taskData } =
    props;
  const stringDate = String(due_by)
  const parsedDate = new Date(stringDate.slice(0, 11) + stringDate.slice(12))
  const [taskItems, setTaskItems] = useState({ results: [] });

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = await axiosReq.get(`/taskitems/?task_id=${id}`)
        setTaskItems(data)
      } catch (error) {
        console.log(error)
      }
    }
    onMount();
  }, [id, setTaskItems])
  
  const handleComplete = async () => {
    try {
      const { data } = await axiosReq.put(`/tasks/${id}/`, { ...taskData.results, due_by: parsedDate.toISOString(), is_completed: true, title: title });
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
            <span>{`Due: ${due_by}`}</span>
            <br />
            <strong>{description}</strong>
            <hr />
            {taskItems.results.length ? (
              <>
                {taskItems?.results.map((taskItem, index) => {
                  return <TaskItem key={index} taskItem={taskItem} />
                })}
              </>
            ) : (
              <span>This task has no items.</span>
            )}
            
          </Card.Text>
          {is_owner ? (
            <Container>
              <span onClick={() => history.goBack()}><i className="fa-solid fa-rotate-left"></i></span>
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