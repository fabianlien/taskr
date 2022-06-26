import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Task from "./Task";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id;
  const [tasks, setTasks] = useState({ results: [] });
  const [profileData, setProfileData] = useState({});
  const { owner, name, bio, profile_image } = profileData;
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  useEffect(() => {
    const onMount = async () => {
      try {
        const [{ data: task }, { data: profile }] = await Promise.all([
          is_owner
            ? axiosReq.get(`/tasks/?owner__profile=${profile_id}`)
            : axiosReq.get(
                `/tasks/?owner__profile=${profile_id}&is_public=True`
              ),
          axiosReq.get(`/profiles/${profile_id}`),
        ]);
        setTasks(task);
        setProfileData(profile);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [setTasks, profile_id, is_owner]);

  const goToUpdate = () => {
    history.push(`/profile/${profile_id}/edit`);
  };

  return (
    <Container>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <strong>{owner}</strong>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <span>
                <i
                  className="fa-solid fa-pen-to-square"
                  aria-label="edit profile name"
                  onClick={goToUpdate}
                ></i>
              </span>
              <Card.Img
                src={profile_image}
                roundedCircle
                fluid
                alt="profile image"
              />

              <Card.Title>{name}'s tasks</Card.Title>
              <Card.Text>
                <p>{bio}</p>
              </Card.Text>
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
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      {tasks.results.length ? (
        tasks.results.map((task) => (
          <Accordion defaultActiveKey={task.is_completed ? "1" : "0"}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <strong>{task.due_by}</strong>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Link key={task.id} to={`/task/${task.id}`}>
                  <Task {...task} />
                </Link>
              </Accordion.Collapse>
          </Accordion>
        ))
      ) : (
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>No tasks to display.</Card.Title>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ProfilePage;
