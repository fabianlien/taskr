import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import TaskItem from "../../pages/tasks/TaskItem.js";
import { Link, useHistory, useParams } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults.js";
import styles from "../../styles/Detail.module.css";
import CreateTaskItemForm from "./CreateTaskItemForm.js";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
 
const Task = () => {
  const { id } = useParams(); 
  const history = useHistory();
  const [task, setTask] = useState({});
  const [taskItems, setTaskItems] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const [refresh, setRefresh] = useState("")

  useEffect(() => {
    const onMount = async () => {
      try {
        const [{ data: task }, { data: taskItems}] = await Promise.all([
          axiosReq.get(`/tasks/${id}/`),
          axiosReq.get(`/taskitems/?task_id=${id}`)
        ]);
        setTask(task)
        setTaskItems(taskItems)
      } catch (error) {
        console.log(error)
      }
      setRefresh(refresh);
    }
    onMount();
  }, [id, setTaskItems, setTask, refresh])

  const { is_owner, title, is_completed, due_by, description, setTaskData, taskData } = task
  const stringDate = String(due_by)
  const parsedDate = new Date(stringDate.slice(0, 11) + stringDate.slice(12))
  
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
    history.goBack();
}

  return (
    <Container className={styles.Container}>
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
                  return <TaskItem key={index} taskItem={taskItem} is_owner={is_owner}/>
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
              <CreateTaskItemForm task_id={id} task={task} setTask={setTask} setRefresh={setRefresh}/>
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
