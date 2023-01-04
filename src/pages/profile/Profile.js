import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import UserSearchBar from "../../components/UserSearchBar";
import styles from "../../styles/Profile.module.css";
import TaskSearchBar from "../../components/TaskSearchBar";
import TaskPreview from "../../components/TaskPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import ProfileInfo from "../../components/ProfileInfo";
import TaskList from "../../components/TaskList";

const Home = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();

  const [profileData, setProfileData] = useState({});
  const { owner, name, bio, profile_image } = profileData;
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } =
          await axiosReq.get(`/profiles/${id}`)
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
              {is_owner ? (
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  justify
                >
                  <Tab eventKey="home" title="Your Tasks">
                    <TaskList/>
                  </Tab>
                  <Tab eventKey="profile" title="Requested Tasks"></Tab>
                </Tabs>
              ) : (
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  justify
                >
                  <Tab eventKey="home" title={`${owner}'s Tasks`}></Tab>
                  <Tab eventKey="profile" title="Your Requests"></Tab>
                </Tabs>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default Home;
