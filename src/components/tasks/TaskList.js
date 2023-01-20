import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Col, Row, Spinner } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import TaskPreview from "./TaskPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import styles from "../../styles/TaskList.module.css";
import TaskSearchBar from "./TaskSearchBar";

const TaskList = ({ owner }) => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(true);
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [tasksFiltered, setTasksFiltered] = useState({ results: [] });
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = is_owner
          ? await axiosReq.get(`/tasks/?owner__profile=${id}`)
          : await axiosReq.get(`/tasks/?owner__profile=${id}&is_public=True`);
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();

    const fetchQuery = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?search=${taskSearchQuery}`
        );
        if (taskSearchQuery.length) {
          setTasksFiltered(data);
          setHasLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setHasLoaded(false);
    const searchTimer = setTimeout(() => {
      fetchQuery();
    }, 800);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [setTasks, is_owner, id, currentUser, taskSearchQuery, setTasksFiltered, setHasLoaded]);

  return (
    <Container fluid>
      <TaskSearchBar
        setTasksFiltered={setTasksFiltered}
        taskSearchQuery={taskSearchQuery}
        setTaskSearchQuery={setTaskSearchQuery}
      />
      {taskSearchQuery.length ? (
        <>
          {hasLoaded ? (
            <>
              {tasksFiltered.results.length ? (
                <>
                  {tasksFiltered.results
                    .filter(
                      (task) =>
                        task.owner === owner && task.request_accepted !== "no"
                    )
                    .map((task, index) => {
                      return (
                        <TaskPreview key={index} task={task} user_id={id} />
                      );
                    })}
                </>
              ) : (
                <Card className={styles.RequestCard}>
                  <Card.Body className={styles.TaskCardBody}>
                    <Card.Title className={styles.TextBox}>
                      No tasks found for "{taskSearchQuery}".
                    </Card.Title>
                  </Card.Body>
                </Card>
              )}
            </>
          ) : (
            <Row className={styles.NoTasksBox}>
              <Col xs={{range: 2, offset: 5}}>
                <Spinner animation="border" className={styles.Spinner} />
              </Col>
            </Row>
          )}
        </>
      ) : (
        <>
          {tasks.results.length ? (
            <InfiniteScroll
              children={tasks.results
                .filter(
                  (task) =>
                    task.owner === owner && task.request_accepted !== "no"
                )
                .map((task, index) => (
                  <TaskPreview key={index} task={task} />
                ))}
              dataLength={tasks.results.length}
              hasMore={!!tasks.next}
              loader={<Spinner animation="border" className={styles.Spinner} />}
              next={() => fetchMoreData(tasks, setTasks)}
              style={{ overflowY: "hidden" }}
            />
          ) : (
            <Card className={styles.RequestCard}>
              <Card.Body className={styles.TaskCardBody}>
                <Card.Title className={styles.TextBox}>
                  No tasks to display.
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

export default TaskList;
