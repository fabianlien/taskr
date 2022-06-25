import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Task from "../../components/Task";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const ProfilePage = () => {
  //  const [profileData, setProfileData] = useState({})
  const currentUser = useCurrentUser();
  const [tasks, setTasks] = useState({ results: [] });

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks`);
        setTasks(data);
        console.log(tasks.results.length);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [tasks.results.length]);

  //    const fetchProfileData = () => {
  //      try {
  //        const { data } = axiosReq.get((`/profiles/${currentUser.profile_id}/`))
  //        setProfileData(data)
  //      } catch (error) {
  //        console.log(error)
  //      }
  //    }
  //    fetchProfileData();
  //    console.log(profileData)
  //  }, [])

  return (
    <Container>
      <Card style={{ width: "100%" }}>
        <Card.Img variant="left" src="currentUser?.profile_image" />
        <Card.Body>
          <Card.Title>{currentUser.username}</Card.Title>
          <Card.Text>
            <h3>Profile information displayed here</h3>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to="/task/create">
            <Button variant="warning">+ Task</Button>
          </Link>
        </Card.Body>
      </Card>
      {tasks.results.length ? (
        tasks.results.map((task) => (
          <Link to={`/task/${task.id}`}>
            <Task key={task.id} {...task} />
          </Link>
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
