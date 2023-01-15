import React from "react";
import { Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/TaskPreview.module.css";

const TaskPreview = ({ task }) => {
  const {
    owner,
    due_by,
    id,
    title,
    is_completed,
    description,
    requested_ID,
    requested_username,
  } = task;
  const currentUser = useCurrentUser();
  const Overdue = new Date(due_by).getTime() < new Date().getTime();
  const incomingReq = requested_ID > 0 && requested_ID !== currentUser.pk;
  const outgoingReq = requested_ID > 0 && requested_ID === currentUser.pk;
  const cardHeaderContent = (
    <Row>
      <Col className={styles.DueDate}>{due_by}</Col>
      <Col className={styles.OverDue}>
        {Overdue && !task.is_completed && "Overdue!"}
      </Col>
      <Col className={`d-none d-lg-block ${styles.RequestText}`}>
        {incomingReq && `From: ${requested_username}`}
        {outgoingReq && `To: ${owner}`}
      </Col>
    </Row>
  );

  return (
    <Col lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
      <Accordion defaultActiveKey={is_completed ? "1" : "0"}>
        {is_completed ? (
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            className={styles.CompletedCardHeader}
          >
            {cardHeaderContent}
          </Accordion.Toggle>
        ) : (
          <>
            {requested_ID > 0 ? (
              <>
                {incomingReq && (
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey="0"
                    className={styles.InReqCardHeader}
                  >
                    {cardHeaderContent}
                  </Accordion.Toggle>
                )}
                {outgoingReq && (
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey="0"
                    className={styles.OutReqCardHeader}
                  >
                    {cardHeaderContent}
                  </Accordion.Toggle>
                )}
              </>
            ) : (
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                className={styles.CardHeader}
              >
                {cardHeaderContent}
              </Accordion.Toggle>
            )}
          </>
        )}
        <Accordion.Collapse eventKey="0">
          <Link to={`/task/${id}`}>
            <Card className={styles.PreviewCard}>
              <Card.Body>
                <Card.Title className={styles.TaskTitle}>{title}</Card.Title>
                <Card.Body>{}</Card.Body>
                <Card.Text className={styles.TaskDescription}>{description}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Accordion.Collapse>
      </Accordion>
    </Col>
  );
};

export default TaskPreview;
