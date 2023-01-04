import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import TaskSearchBar from "../components/TaskSearchBar";
import TaskPreview from "./TaskPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils/utils";

const TaskList = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });
  const [profileData, setProfileData] = useState({});
  const [requestedTasks, setRequestedTasks] = useState({ results: [] });
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [tasksFiltered, setTasksFiltered] = useState({ results: [] });
  const { owner, name, bio, profile_image } = profileData;
  const is_owner = currentUser?.username === owner;

  useEffect(() => {
    const onMount = async () => {
      try {
        const [{ data: tasks }, { data: profile }, { data: requestedTasks }] =
          await Promise.all([
            is_owner
              ? axiosReq.get(`/tasks/?owner__profile=${id}&is_request=False`)
              : axiosReq.get(`/tasks/?owner__profile=${id}&is_public=True`),
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(
              `/tasks/?owner__profile=${currentUser.pk}&requestee=${id}`
            ),
          ]);
        setProfileData(profile);
        setTasks(tasks);
        setRequestedTasks(requestedTasks);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [setTasks, is_owner, id, currentUser]);

  return (
    <Container fluid>
        <TaskSearchBar
          setTasksFiltered={setTasksFiltered}
          taskSearchQuery={taskSearchQuery}
          setTaskSearchQuery={setTaskSearchQuery}
        />
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
  )
}

export default TaskList