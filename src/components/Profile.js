import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Task from "./Task";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id;
  const [tasks, setTasks] = useState({ results: [] });
  const [profileData, setProfileData] = useState({})
  const {name, bio, profile_image} = profileData

  useEffect(() => {
    const onMount = async () => {
      
      try {
        const [{ data: task }, { data: profile}] = await Promise.all([
          axiosReq.get(`/tasks/?owner__profile=${profile_id}&is_public=True`),
          axiosReq.get(`/profiles/${profile_id}`)
        ])
        setTasks(task)
        setProfileData(profile)
      } catch (error) {
        console.log(error);
      }

//      try {
//        const {data} = await axiosReq.get(`/tasks/?owner__profile=${profile_id}&is_public=True`)
//        setTasks(data)
//        console.log(data)
//      } catch (error) {
//        console.log(error)
//      }

    };
    onMount();
  }, [setTasks, profile_id]);


  return (
    <Container>
      <Card style={{ width: "100%" }}>
        <Card.Img variant="left" src="currentUser?.profile_image" />
        <Card.Body>
          <Card.Title>{currentUser.username}</Card.Title>
          <Card.Text>
            <p>Profile information displayed here</p>
            <p>Some quick example text to build on the card title and make up the
            bulk of the card's content.</p>
          </Card.Text>
          <Link to="/task/create">
            <Button variant="warning">+ Task</Button>
          </Link>
        </Card.Body>
      </Card>
      {tasks.results.length ? (
        tasks.results.map((task) => (
          <Link key={task.id} to={`/task/${task.id}`}>
            <Task {...task} />
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
