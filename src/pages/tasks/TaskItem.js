import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";

const TaskItem = ({ taskItem }) => {
  const { content, id, is_completed } = taskItem;
  const [checkCompleted, setCheckCompleted] = useState(is_completed);

  const toggleBool = (value) => !value;

  const sendCheck = async (completed) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("is_completed", completed);
    formData.append("task_id", id);

    try {
      await axiosReq.put(`/taskitems/${id}/`, formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/taskitems/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <span>{content}</span>
      <span>{id}</span>
      <span>
        <Form>
          <Form.Check
            type="switch"
            name="priority"
            checked={checkCompleted}
            onChange={(event) => {
              setCheckCompleted(toggleBool);
              sendCheck(event.target.checked);
            }}
          />
          <Form.Group onClick={handleDelete}>
            <i className="fa-solid fa-xmark"></i>
          </Form.Group>
        </Form>
      </span>
    </div>
  );
};

export default TaskItem;
