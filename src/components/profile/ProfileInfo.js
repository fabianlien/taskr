import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Profile.module.css";

const ProfileInfo = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [activeTasks, setActiveTasks] = useState({ results: [] });
  const { owner, name, bio, profile_image } = profileData;
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const [{ data: profile }, { data: activetasks }] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
          axiosReq.get(`/tasks/?owner__profile=${id}&is_completed=False`),
        ]);
        setProfileData(profile);
        setActiveTasks(activetasks);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [is_owner, id, currentUser]);

  const filteredActiveTasks = activeTasks.results.filter(
    (task) => task.request_accepted === "0"
  ).length;
  const filteredActiveRequests = activeTasks.results.filter(
    (task) => task.request_accepted === "yes"
  ).length;
  const filteredActiveTotal = (
    filteredActiveTasks + filteredActiveRequests
  ).toString();

  return (
    <Container>
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
              className={`${"d-none"} ${"d-md-block"} ${styles.ProfileBio}`}
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
                <Row>
                  <Col xs={10} className={styles.NameContainer}>{name}</Col>
                  <Col xs={2} className={styles.CaretContainer}>
                    <i
                      className={`${"fa-solid fa-square-caret-down"} ${
                        styles.BioCaret
                      }`}
                    />
                  </Col>
                </Row>
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
            {is_owner ? (
              <Button variant="secondary" className={styles.TaskButton}>
                + Task
              </Button>
            ) : (
              <Button variant="warning" className={styles.RequestButton}>
                + Request
              </Button>
            )}
          </Link>
        </Col>
        <Col>
          {name ? (
            <div className={styles.ActiveTasksContainer}>
              <Card.Text className="d-none d-md-block">
                {name}'s active tasks: <strong>{filteredActiveTotal}</strong>
              </Card.Text>
              <Card.Text className="d-md-none">
                Active tasks: <strong>{filteredActiveTotal}</strong>
              </Card.Text>
            </div>
          ) : (
            <div className={styles.ActiveTasksContainer}>
              <Card.Text>
                Active Tasks: <strong>{filteredActiveTotal}</strong>
              </Card.Text>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileInfo;
