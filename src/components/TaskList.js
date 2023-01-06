import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Spinner } from "react-bootstrap";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import TaskSearchBar from "../components/TaskSearchBar";
import TaskPreview from "./TaskPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils/utils";
import styles from "../styles/SearchBar.module.css";

const TaskList = ({owner}) => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [tasksFiltered, setTasksFiltered] = useState({ results: [] });
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } =
            is_owner
              ? await axiosReq.get(`/tasks/?owner__profile=${id}&is_request=False`)
              : await axiosReq.get(`/tasks/?owner__profile=${id}&is_request=False&is_public=True`)
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [setTasks, is_owner, id, currentUser]);

  return (
    <Container fluid>
        <TaskSearchBar
          setTasksFiltered={setTasksFiltered}
          taskSearchQuery={taskSearchQuery}
          setTaskSearchQuery={setTaskSearchQuery}
        />
        {taskSearchQuery.length ? (
          <>
            {tasksFiltered.results.length ? (
              <>
                {tasksFiltered.results
                  .filter((task) => task.owner === owner)
                  .map((task, index) => {
                    return <TaskPreview key={index} task={task} />;
                  })}
              </>
            ) : (
              <>
                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <Card.Title>No tasks to display.</Card.Title>
                  </Card.Body>
                </Card>
              </>
            )}
          </>
        ) : (
          <>
            {tasks.results.length ? (
              <InfiniteScroll
                children={tasks.results.map((task, index) => (
                  <TaskPreview key={index} task={task} />
                ))}
                dataLength={tasks.results.length}
                hasMore={!!tasks.next}
                loader={<Spinner animation="border" className={styles.Spinner}/>}
                next={() => fetchMoreData(tasks, setTasks)}
                style={{ overflowY: 'hidden' }}
              />
            ) : (
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>No tasks to display.</Card.Title>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </Container>
  )
}

export default TaskList