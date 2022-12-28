import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";

const TaskSearchBar = ({setTasksFiltered, taskSearchQuery, setTaskSearchQuery}) => {
  
  useEffect(() => {
    const fetchQuery = async () => {
        try {
            const { data } = await axiosReq.get(`/tasks/?search=${taskSearchQuery}`);
            if (taskSearchQuery.length) {
              setTasksFiltered(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const searchTimer = setTimeout(() => {
      fetchQuery();
    }, 800)
    return () => {
      clearTimeout(searchTimer)
    }
  }, [taskSearchQuery, setTasksFiltered])

  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <Form.Control
        type="text"
        placeholder="Search tasks..."
        value={taskSearchQuery}
        onChange={(event) => setTaskSearchQuery(event.target.value)}
      />
    </Form>
  );
};

export default TaskSearchBar;
