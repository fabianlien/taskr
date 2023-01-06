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

const RequestList = ({owner}) => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [requestedTasks, setRequestedTasks] = useState({ results: [] });
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [tasksFiltered, setTasksFiltered] = useState({ results: [] });
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = 
        is_owner
            ? await axiosReq.get(`/tasks/?owner__profile=${id}&is_request=True`)
            : await axiosReq.get(`/tasks/?owner__profile=${id}&requested_ID=${id}`)
        setRequestedTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [is_owner, id, currentUser]);

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
            {requestedTasks.results.length ? (
              <InfiniteScroll
                children={requestedTasks.results.map((task, index) => (
                  <TaskPreview key={index} task={task} />
                ))}
                dataLength={requestedTasks.results.length}
                hasMore={!!requestedTasks.next}
                loader={<Spinner animation="border" />}
                next={() => fetchMoreData(requestedTasks, setRequestedTasks)}
              />
            ) : (
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>{owner} has no requested tasks to display.</Card.Title>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </Container>
  )
}

export default RequestList