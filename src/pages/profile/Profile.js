import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spinner } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import UserSearchBar from "../../components/UserSearchBar";
import styles from "../../styles/Profile.module.css";
import TaskSearchBar from "../../components/TaskSearchBar";
import TaskPreview from "../tasks/TaskPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const Home = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });
  const [profileData, setProfileData] = useState({});
  const [activeTasks, setActiveTasks] = useState({ results: [] });
  const [requestedTasks, setRequestedTasks] = useState({ results: [] });
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [tasksFiltered, setTasksFiltered] = useState({ results: [] });
  const { owner, name, bio, profile_image } = profileData;
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const [{ data: tasks }, { data: profile }, { data: activeTasks }, { data: requestedTasks }] =
          await Promise.all([
            is_owner
              ? axiosReq.get(`/tasks/?owner__profile=${id}&is_request=False`)
              : axiosReq.get(`/tasks/?owner__profile=${id}&is_public=True`),
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(`/tasks/?owner__profile=${id}&is_completed=False&is_request=False`),
            axiosReq.get(`/tasks/?owner__profile=${currentUser.pk}&requestee=${id}`)
          ]);
        setProfileData(profile);
        setTasks(tasks);
        setActiveTasks(activeTasks);
        setRequestedTasks(requestedTasks);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [setTasks, is_owner, id, currentUser.pk]);

  return (
    <Container id={styles.ProfileContainer}>
      <UserSearchBar />
      <Accordion defaultActiveKey="0">
        <Card className={styles.ProfileCard}>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <strong className={styles.ProfileCardTitle}>{owner}</strong>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles.ProfileBody}>
              <div id={styles.ProfileImageBox}>
                {is_owner && (
                  <Link
                    className={styles.EditProfileIcon}
                    to={`/profile/${id}/edit`}
                    state={[profileData, setProfileData]}
                  >
                    <i
                      className="fa-solid fa-pen-to-square"
                      aria-label="edit profile"
                    ></i>
                  </Link>
                )}
                <Row>
                  <Col xs={6}>
                    <Card.Text
                      className={`${"d-none"} ${"d-md-block"} ${
                        styles.ProfileBio
                      }`}
                    >
                      {bio}
                    </Card.Text>
                  </Col>
                  <Col md={6}>
                    <Card.Img
                      src={profile_image}
                      rounded="true"
                      fluid="true"
                      alt="profile image"
                      className={`${styles.ProfileImage}`}
                    />
                  </Col>
                  <Col>
                    <Accordion defaultActiveKey="1" className="d-md-none">
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey="0"
                        className={styles.BioCollapseToggle}
                      >
                        <i
                          className={`${"fa-solid fa-square-caret-down"} ${
                            styles.BioCaret
                          }`}
                        ></i>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Text>{bio}</Card.Text>
                      </Accordion.Collapse>
                    </Accordion>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                <Link to={`/task/create/${owner}`}>
                      <Button variant="warning" className={styles.TaskButton}>
                        {is_owner ? "+ Task" : "+ Task Request"}
                      </Button>
                    </Link>
                </Col>
                <Col>
                  {name ? (
                    <div className={styles.ActiveTasksContainer}>
                      <Card.Text>
                        {name}'s active tasks:{" "}
                        <strong>{activeTasks.count}</strong>
                      </Card.Text>
                    </div>
                  ) : (
                    <div className={styles.ActiveTasksContainer}>
                      <Card.Text>
                        Active Tasks: <strong>{activeTasks.count}</strong>
                      </Card.Text>
                    </div>
                  )}
                </Col>
              </Row>

              <TaskSearchBar
                setTasksFiltered={setTasksFiltered}
                taskSearchQuery={taskSearchQuery}
                setTaskSearchQuery={setTaskSearchQuery}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      {taskSearchQuery.length ? (
        <>
          {tasksFiltered.results.length ? (
            <>
              {tasksFiltered.results
                .filter((task) => task.owner === profileData.owner)
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
              loader={<Spinner animation="border" />}
              next={() => fetchMoreData(tasks, setTasks)}
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
  );
};

export default Home;
