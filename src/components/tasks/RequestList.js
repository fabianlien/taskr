import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Accordion, Col, Row, Spinner } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import TaskSearchBar from "./TaskSearchBar";
import TaskPreview from "./TaskPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import styles from "../../styles/RequestList.module.css";

const RequestList = ({ owner }) => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(true);
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
  }, [is_owner, id, currentUser, taskSearchQuery]);

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
          {hasLoaded ? (
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
                <Card className={styles.RequestCard}>
                  <Card.Body className={styles.RequestCardBody}>
                    <Card.Title className={styles.TextBox}>
                      No tasks to display.
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
          {requests.length ? (
            <Card className={styles.RequestCard}>
              <Accordion defaultActiveKey="0">
                {is_owner && (
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Row>
                      <Col
                        lg={{ span: 10, offset: 1 }}
                        xl={{ span: 8, offset: 2 }}
                      >
                        <Card.Title className={styles.RequestsBox}>
                          New incoming Requests:
                        </Card.Title>
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                )}
                <Accordion.Collapse eventKey="0">
                  <InfiniteScroll
                    children={(is_owner
                      ? requests
                      : requestedTasks.results
                    ).map((task, index) => (
                      <TaskPreview key={index} task={task} user_id={id} />
                    ))}
                    dataLength={requests.length}
                    hasMore={!!requestedTasks.next}
                    loader={
                      <Spinner animation="border" className={styles.Spinner} />
                    }
                    next={() =>
                      fetchMoreData(requestedTasks, setRequestedTasks)
                    }
                  />
                </Accordion.Collapse>
              </Accordion>
            </Card>
          ) : (
            <Card className={styles.RequestCard}>
              <Card.Body className={styles.RequestCardBody}>
                <Card.Title className={styles.TextBox}>
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
                <Card className={styles.RequestCard}>
                  <Accordion defaultActiveKey="0">
                    {is_owner && (
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Row>
                          <Col
                            lg={{ span: 10, offset: 1 }}
                            xl={{ span: 8, offset: 2 }}
                          >
                            <Card.Title className={styles.RequestsBox}>
                              Outgoing Requests:
                            </Card.Title>
                          </Col>
                        </Row>
                      </Accordion.Toggle>
                    )}
                    <Accordion.Collapse eventKey="0">
                      <InfiniteScroll
                        children={userRequests.results?.map((task, index) => (
                          <TaskPreview key={index} task={task} />
                        ))}
                        dataLength={userRequests.results.length}
                        hasMore={!!userRequests.next}
                        loader={
                          <Spinner
                            animation="border"
                            className={styles.Spinner}
                          />
                        }
                        next={() =>
                          fetchMoreData(userRequests, setUserRequests)
                        }
                      />
                    </Accordion.Collapse>
                  </Accordion>
                </Card>
              ) : (
                <>
                  {is_owner ? (
                    <Card className={styles.RequestCard}>
                      <Card.Body className={styles.RequestCardBody}>
                        <Card.Title className={styles.TextBox}>
                          You have no outgoing requests.
                        </Card.Title>
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
