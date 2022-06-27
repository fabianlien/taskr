import React from "react";
import Button from "react-bootstrap/Button";

const CreateTaskItemForm = (props) => {
  const { task_id } = props
  
    return (
    <div>
      {task_id}
      <Button onClick={() => {}}>+ Item</Button>
    </div>
    
  )
}

export default CreateTaskItemForm