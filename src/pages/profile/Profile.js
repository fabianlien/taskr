import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import SearchBar from "../../components/SearchBar";
import ProfilePreview from "./ProfilePreview";

const Home = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });
  const [profileData, setProfileData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [profilesPreview, setProfilesPreview] = useState({ results: [] });
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
    <Container>
      <SearchBar
        setProfilesPreview={setProfilesPreview}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {searchQuery.length ? (
        <>
          {profilesPreview.results.length ? (
            <>
              {profilesPreview.results.map((profile, index) => {
                return (
                  <ProfilePreview
                    key={index}
                    profile={profile}
                    setSearchQuery={setSearchQuery}
                  />
                );
              })}
            </>
          ) : (
            <strong>No usernames containing "{searchQuery}" found.</strong>
          )}
        </>
      ) : (
        <>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <strong>{owner}</strong>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {is_owner ? (
                    <Link
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
                  />

                  <Card.Title>{name ? name : owner}'s tasks</Card.Title>
                  <Card.Text>{bio}</Card.Text>
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
            tasks.results.map((task, index) => (
              <Accordion
                key={index}
                defaultActiveKey={task.is_completed ? "1" : "0"}
              >
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <strong>{task.due_by}</strong>
                  <span>
                    {new Date(task.due_by).getTime() < new Date().getTime() &&
                    !task.is_completed
                      ? "Overdue"
                      : ""}
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Link to={`/task/${task.id}`}>
                    <Card style={{ width: "100%" }}>
                      <Card.Body>
                        <Card.Title>
                          <h3>{task.title}</h3>
                        </Card.Title>
                        {task.is_completed ? (
                          <h4>Completed!</h4>
                        ) : (
                          <h4>Task not completed!</h4>
                        )}
                        <Card.Text>
                          <strong>{task.description}</strong>
                        </Card.Text>
                      </Card.Body>
                    </Card>
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
        </>
      )}
    </Container>
  );
};

export default Home;
