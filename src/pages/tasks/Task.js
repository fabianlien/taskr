import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults.js";
import styles from "../../styles/Detail.module.css";
import CreateTaskItemList from "./CreateTaskItemList.js";
import { Col, Row } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext.js";

const Task = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const {
    owner,
    is_owner,
    title,
    is_completed,
    due_by,
    created_at,
    description,
    request_accepted,
    requested_username,
    requested_ID,
  } = task;
  const stringDate = String(due_by);
  const parsedDate = new Date(stringDate.slice(0, 11) + stringDate.slice(12));
  const overdue = new Date(due_by).getTime() < new Date().getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        setTask(data);
      } catch (error) {
        console.log(error);
      }
      const countDown = setInterval(() => {
        const reamingTime = new Date(due_by).getTime() - new Date().getTime();
        const days = Math.floor(reamingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (reamingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (reamingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((reamingTime % (1000 * 60)) / 1000);

        setTimeLeft(prevState => ({...prevState,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        }));

        if (overdue) {
          clearInterval(countDown);
        }
      }, 1000);
    };
    onMount();
  }, [id, setTask, setTimeLeft, due_by, overdue]);

  const handleComplete = async () => {
    try {
      const { data } = await axiosReq.put(`/tasks/${id}/`, {
        ...task,
        due_by: parsedDate.toISOString(),
        is_completed: true,
      });
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      const { data } = await axiosReq.put(`/tasks/${id}/`, {
        ...task,
        due_by: parsedDate.toISOString(),
        request_accepted: "yes",
      });
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
    } catch (error) {
      console.log(error);
    }
    navigate(-1);
  };

  return (
    <Container className={styles.Container}>
      <Card style={{ width: "100%", marginBottom: "20px" }}>
        {request_accepted === "no" ? (
          <Card.Text className={styles.TaskNewRequest} />
        ) : (
          <>
            {is_completed ? (
              <Card.Text className={styles.TaskComplete}></Card.Text>
            ) : (
              <Card.Text className={styles.TaskIncomplete}>
                {overdue && "Overdue"}
              </Card.Text>
            )}
          </>
        )}
        <Card.Title>
          <div className={styles.Heading}>{title}</div>
        </Card.Title>
        <Card.Text>
          <Card.Text className={styles.DueBox2}>{`Due: ${due_by}`}</Card.Text>
          <Card.Text
            className={styles.CreatedAtBox}
          >{`Created: ${created_at}`}</Card.Text>
          {!overdue && (
            <Card.Text
              className={styles.TimeRemainingBox}
            >{`Due In: ${timeLeft.days} days, ${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</Card.Text>
          )}
          {requested_ID > 0 && requested_username !== currentUser?.username && (
            <Card.Text className={styles.DueBox2}>
              Request from:{" "}
              <Link
                className={styles.RequestedUserLink}
                to={`/Profile/${requested_ID}/`}
              >
                {requested_username}
              </Link>
            </Card.Text>
          )}
          {requested_ID > 0 && requested_username === currentUser?.username && (
            <Card.Text className={styles.DueBox2}>
              Request to:{" "}
              <Link
                className={styles.RequestedUserLink}
                to={`/Profile/${owner}/`}
              >
                {owner}
              </Link>
            </Card.Text>
          )}
          <Card.Text className={styles.TextBody}>{description}</Card.Text>
          <div as={Row} className={styles.Line}></div>
          <Row>
            <Col sm={{ offset: 1 }} className="mt-4">
              <CreateTaskItemList task_id={id} is_owner={is_owner} />
            </Col>
          </Row>
        </Card.Text>
      </Card>
      {is_owner ? (
        <Container>
          <Card.Text className={styles.GoBack} onClick={() => navigate(-1)}>
            <i className="fa-solid fa-rotate-left" />
          </Card.Text>
          <Row>
            {request_accepted === "no" ? (
              <>
                <Col sm={6}>
                  <Button
                    onClick={handleAccept}
                    variant="success"
                    className={styles.ConfirmButton}
                  >
                    Accept
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button
                    onClick={handleDelete}
                    variant="warning"
                    className={`${styles.DeleteButton} ${styles.RejectButton}`}
                  >
                    Reject
                  </Button>
                </Col>
              </>
            ) : (
              <>
                {!is_completed ? (
                  <Col sm={6}>
                    <Button
                      onClick={handleComplete}
                      variant="success"
                      className={styles.ConfirmButton}
                    >
                      Complete
                    </Button>
                  </Col>
                ) : (
                  <Col sm={6}>
                    <Link
                      className={styles.Link}
                      to={`/task/create/${currentUser?.username}`}
                    >
                      <Button
                        variant="success"
                        className={styles.ConfirmButton}
                      >
                        New task
                      </Button>
                    </Link>
                  </Col>
                )}
                <Col md={3} sm={6}>
                  <Link className={styles.Link} to={`/task/${id}/update`}>
                    <Button variant="warning" className={styles.CancelButton}>
                      Edit
                    </Button>
                  </Link>
                </Col>
                <Col sm={{ span: 10, offset: 1 }} md={{ span: 3, offset: 0 }}>
                  <Button
                    onClick={handleDelete}
                    variant="warning"
                    className={styles.DeleteButton}
                  >
                    Delete
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Container>
      ) : (
        <Card.Text className={styles.GoBack} onClick={() => navigate(-1)}>
          <i className="fa-solid fa-rotate-left" />
        </Card.Text>
      )}
    </Container>
  );
};

export default Task;
