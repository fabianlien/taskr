import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults.js";
import styles from "../../styles/Detail.module.css";
import CreateTaskItemForm from "./CreateTaskItemList.js";
import { Col, Row } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext.js";

const Task = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const [task, setTask] = useState({});

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        setTask(data);
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [id, setTask]);

  const {
    is_owner,
    title,
    is_completed,
    due_by,
    description,
    request_accepted,
  } = task;
  const stringDate = String(due_by);
  const parsedDate = new Date(stringDate.slice(0, 11) + stringDate.slice(12));
  const Overdue = new Date(due_by).getTime() < new Date().getTime();

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
        request_accepted: "yes"
      });
      setTask(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
    } catch (error) {
      console.log(error);
    }
    history.goBack();
  };

  return (
    <Container className={styles.Container}>
      {console.log(task)}
      <Card style={{ width: "100%", marginBottom: "20px" }}>
        {request_accepted === "no" ? (
          <Card.Text className={styles.TaskNewRequest}></Card.Text>
        ) : (
          <>
            {is_completed ? (
              <Card.Text className={styles.TaskComplete}></Card.Text>
            ) : (
              <Card.Text className={styles.TaskIncomplete}>
                {Overdue ? "Overdue" : ""}
              </Card.Text>
            )}
          </>
        )}
        <Card.Title>
          <div className={styles.Heading}>{title}</div>
        </Card.Title>
        <Card.Text>
          <Card.Text className={styles.DueBox2}>{`Due: ${due_by}`}</Card.Text>
          <Card.Text className={styles.TextBody}>{description}</Card.Text>
          <div as={Row} className={styles.Line}></div>
          <Row>
            <Col sm={{ offset: 1 }} className="mt-4">
              <CreateTaskItemForm
                task_id={id}
                task={task}
                setTask={setTask}
                is_owner={is_owner}
              />
            </Col>
          </Row>
        </Card.Text>
      </Card>
      {is_owner ? (
        <Container>
          <Card.Text className={styles.GoBack} onClick={() => history.goBack()}>
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
        <Card.Text className={styles.GoBack} onClick={() => history.goBack()}>
          <i className="fa-solid fa-rotate-left" />
        </Card.Text>
      )}
    </Container>
  );
};

export default Task;
