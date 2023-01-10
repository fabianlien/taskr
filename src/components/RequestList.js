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

const RequestList = ({ owner }) => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [requestedTasks, setRequestedTasks] = useState({ results: [] });
  const [userRequests, setUserRequests] = useState({ results: [] });
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [tasksFiltered, setTasksFiltered] = useState({ results: [] });
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        if (is_owner) {
          const [{ data: newRequests }, { data: userRequests }] =
            await Promise.all([
              axiosReq.get(`/tasks/?owner__profile=${id}`),
              axiosReq.get(`/tasks/?requested_ID=${id}`),
            ]);
          setRequestedTasks(newRequests);
          setUserRequests(userRequests);
        } else {
          const { data } = await axiosReq.get(
            `/tasks/?owner__profile=${id}&requested_ID=${currentUser.pk}`
          );
          setRequestedTasks(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [is_owner, id, currentUser]);

  const requests = requestedTasks.results?.filter(
    (task) => task.request_accepted === "no"
  );

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
                .filter(
                  (task) =>
                    task.requested_username === owner ||
                    task.request_accepted === "no"
                )
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
            <Card>
              {is_owner ? (
                <Card.Title>New incoming Requests</Card.Title>
              ) : (
                <></>
              )}
              <InfiniteScroll
                children={(is_owner ? requests : requestedTasks.results).map(
                  (task, index) => (
                    <TaskPreview key={index} task={task} />
                  )
                )}
                dataLength={requests.length}
                hasMore={!!requestedTasks.next}
                loader={
                  <Spinner animation="border" className={styles.Spinner} />
                }
                next={() => fetchMoreData(requestedTasks, setRequestedTasks)}
              />
            </Card>
          ) : (
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>
                  {is_owner
                    ? "You have no new incoming requests."
                    : `You have not made any requests to ${owner}.`}
                </Card.Title>
              </Card.Body>
            </Card>
          )}
          {is_owner ? (
            <>
              {userRequests.results.length ? (
                <Card>
                  <Card.Title>Your outgoing requests</Card.Title>
                  <InfiniteScroll
                    children={userRequests.results?.map((task, index) => (
                      <TaskPreview key={index} task={task} />
                    ))}
                    dataLength={userRequests.results.length}
                    hasMore={!!userRequests.next}
                    loader={
                      <Spinner animation="border" className={styles.Spinner} />
                    }
                    next={() => fetchMoreData(userRequests, setUserRequests)}
                  />
                </Card>
              ) : (
                <>
                  {is_owner ? (
                    <Card>
                      <Card.Body>
                        <Card.Title>You have no outgoing requests.</Card.Title>
                      </Card.Body>
                    </Card>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Container>
  );
};

export default RequestList;
