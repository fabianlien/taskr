import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Tab, Tabs } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import UserSearchBar from "../../components/UserSearchBar";
import styles from "../../styles/Profile.module.css";
import ProfileInfo from "../../components/ProfileInfo";
import TaskList from "../../components/TaskList";
import RequestList from "../../components/RequestList";

const Home = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();

  const [profileData, setProfileData] = useState({});
  const { owner } = profileData;
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        setProfileData(data);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [is_owner, id, currentUser]);

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
              <ProfileInfo />
              <Tabs defaultActiveKey="tasks" justify className="mt-3" >
                <Tab
                  eventKey="tasks"
                  title={is_owner ? "Your Tasks" : `${owner}'s Tasks`}
                  className={styles.TasksTabBody}
                  id={styles.TasksTab}
                >
                  <TaskList owner={owner} />
                </Tab>
                <Tab
                  eventKey="requests"
                  title={is_owner ? "Requested Tasks" : "Your Requests"}
                  className={styles.RequestsTabBody}
                  id={styles.RequestsTab}
                >
                  <RequestList owner={owner} />
                </Tab>
              </Tabs>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default Home;
