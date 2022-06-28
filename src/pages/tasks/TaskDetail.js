import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Task from "../../components/Task";
import CreateTaskItemForm from "./CreateTaskItemForm";
import Landing from "../../components/Landing";

const TaskDetail = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    const onMount = async () => {
        try {
            const { data } = await axiosReq.get(`/tasks/${id}/`)
            setTask(data)
        } catch (error) {
            console.log(error)
        }
    }
    onMount();
  }, [id, setTask, currentUser]);


  return (
    <>
      {currentUser ? (
        <>
          <Task {...task} setTaskData={setTask} taskData={task}/>
          {task.owner === currentUser.username ? <CreateTaskItemForm task_id={id} task={task} setTask={setTask}/> : <></>}
        </>
      ) : (
        <Landing />
      )}
    </>
  );
};

export default TaskDetail;