import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Task from "./Task";
import CreateTaskItemForm from "./CreateTaskItemForm";
import Landing from "../../components/Landing";

const TaskDetail = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [refresh, setRefresh] = useState("")

  useEffect(() => {
    const onMount = async () => {
        try {
            const { data } = await axiosReq.get(`/tasks/${id}/`)
            setTask(data)
        } catch (error) {
            console.log(error)
        }
        setRefresh(refresh);
    }
    onMount();
  }, [id, setTask, currentUser, setRefresh, refresh]);


  return (
    <>
      {currentUser ? (
        <>
          <Task {...task} setTaskData={setTask} taskData={task} setRefresh={setRefresh} />
          {task.owner === currentUser.username ? <CreateTaskItemForm task_id={id} task={task} setTask={setTask}  setRefresh={setRefresh}/> : <></>}
        </>
      ) : (
        <Landing />
      )}
    </>
  );
};

export default TaskDetail;