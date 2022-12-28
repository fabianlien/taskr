import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import UserSearchBar from "../../components/UserSearchBar";
import ProfilePreview from "./ProfilePreview";
import styles from "../../styles/Profile.module.css";
import TaskSearchBar from "../../components/TaskSearchBar";
import TaskPreview from "../tasks/TaskPreview";

const Home = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });
  const [profileData, setProfileData] = useState({});
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [profilesPreview, setProfilesPreview] = useState({ results: [] });
  const [tasksFiltered, setTasksFiltered] = useState({ results: [] });
  const { owner, name, bio, profile_image } = profileData;
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const [{ data: task }, { data: profile }] = await Promise.all([
          is_owner
            ? axiosReq.get(`/tasks/?owner__profile=${id}`)
            : axiosReq.get(`/tasks/?owner__profile=${id}&is_public=True`),
          axiosReq.get(`/profiles/${id}`),
        ]);
        setTasks(task);
        setProfileData(profile);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [setTasks, is_owner, id]);

  return (
    <Container id={styles.ProfileContainer}>
      <UserSearchBar
        setProfilesPreview={setProfilesPreview}
        userSearchQuery={userSearchQuery}
        setUserSearchQuery={setUserSearchQuery}
      />
      {userSearchQuery.length ? (
        <>
          {profilesPreview.results.length ? (
            <>
              {profilesPreview.results.map((profile, index) => {
                return (
                  <ProfilePreview
                    key={index}
                    profile={profile}
                    setUserSearchQuery={setUserSearchQuery}
                  />
                );
              })}
            </>
          ) : (
            <strong>No usernames containing "{userSearchQuery}" found.</strong>
          )}
        </>
      ) : (
        <>
          <Accordion defaultActiveKey="0">
            <Card className={styles.ProfileCard}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <strong className={styles.ProfileCardTitle}>{owner}</strong>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body className={styles.ProfileBody}>
                  <div id={styles.ProfileImageBox}>
                    <Card.Text className={styles.ProfileBio}>{bio}</Card.Text>
                    {is_owner ? (
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
                    ) : (
                      <></>
                    )}
                    <Card.Img
                      src={profile_image}
                      rounded="true"
                      fluid="true"
                      alt="profile image"
                      className={`${styles.ProfileImage}`}
                    />
                  </div>
                  {is_owner ? (
                    <>
                      <Link to="/task/create">
                        <Button variant="warning">+ Task</Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/task/create">
                      <Button variant="warning">+ Task Request</Button>
                    </Link>
                  )}
                  <Card.Text>{name ? name : owner}'s tasks</Card.Text>
                  <TaskSearchBar
                    setTasksFiltered={setTasksFiltered}
                    taskSearchQuery={taskSearchQuery}
                    setTaskSearchQuery={setTaskSearchQuery}
                  />
                  {console.log(tasksFiltered.results.length)}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          {tasksFiltered.results.length ? (
            <>
            {tasksFiltered.results.map((task, index) => {
              return (
                <TaskPreview
                  key={index}
                  task={task}
                />
              );
            })}
          </>
          ) : (
            <>
              {tasks.results.length ? (
                <>
                  {tasks.results.map((task, index) => {
                    return (
                      <TaskPreview
                        key={index}
                        task={task}
                      />
                    );
                  })}
                </>
              ) : (
                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <Card.Title>No tasks to display.</Card.Title>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
