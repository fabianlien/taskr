import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/Profile.module.css";

const ProfileInfo = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [activeTasks, setActiveTasks] = useState({});
  const { owner, name, bio, profile_image } = profileData;
  const is_owner = currentUser?.username === owner;

    useEffect(() => {
      const onMount = async () => {
        try {
          const [
            { data: profile },
            { data: activetasks },
          ] = await Promise.all([
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(
              `/tasks/?owner__profile=${id}&is_completed=False&is_request=False`
            ),
          ]);
          setProfileData(profile);
          setActiveTasks(activetasks);
        } catch (error) {
          console.log(error);
        }
      };
      onMount();
    }, [is_owner, id, currentUser]);

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
                {name}'s active tasks: <strong>{activeTasks.count}</strong>
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
    </Container>
  );
};

export default ProfileInfo;
