import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const TaskPreview = ({task}) => {
const { due_by, id, title, is_completed, description } = task;

  return (
    <Accordion defaultActiveKey={is_completed ? "1" : "0"}>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        <strong>{due_by}</strong>
        <span>
          {new Date(due_by).getTime() < new Date().getTime() &&
          !task.is_completed
            ? "Overdue"
            : ""}
        </span>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Link to={`/task/${id}`}>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>
                <h3>{title}</h3>
              </Card.Title>
              {is_completed ? (
                <h4>Completed!</h4>
              ) : (
                <h4>Task not completed!</h4>
              )}
              <Card.Text>
                <strong>{description}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default TaskPreview;
