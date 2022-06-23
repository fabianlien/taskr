import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DateTimePicker from "react-datetime-picker";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Alert from "react-bootstrap/Alert";

const CreateTaskForm = () => {
  const currentuser = useCurrentUser();
  const history = useHistory();

  const [taskTextData, setTaskTextData] = useState({
    title: "",
    description: ""
  });
  const { title, description } = taskTextData;
  const [dateTime, setDateTime] = useState(new Date());
  const [checkedPriority, setCheckedPriority] = useState(false);
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    console.log(Date())
    setTaskTextData({
      ...taskTextData,
      [event.target.name]: event.target.value
    })
  }

  const toggleBool = (value) => !value

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title)
    formData.append("description", description)
    formData.append("due_by", dateTime.toISOString())
    formData.append("is_important", checkedPriority)

    try {
      const { data } = await axiosReq.post("/tasks/", formData)
      history.push(`/profile/${currentuser.pk}`)
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401)
        setErrors(error.response?.data)
    }
  }

  return (
    <Container style={{ width: "80%" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="title">
          <Form.Label className="d-none mg-b-20" column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {errors.title?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <Form.Group as={Row} controlId="title">
          <Col sm={10}>
            <DateTimePicker 
              format="yyyy-MM-dd hh:mm" 
              minDate={new Date()}
              value={dateTime} 
              onChange={setDateTime} 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="description">
          <Form.Label className="d-none mg-b-20" column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {errors.description?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}
        
        <fieldset>
          <Form.Group as={Row}>
            <Col sm={10}>
              <Form.Check
                type="switch"
                label="High Priority"
                name="priority"
                checked={checkedPriority}
                onChange={() => setCheckedPriority(toggleBool)}
              />
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Group as={Row}>
          <Col sm={{ span: 4 }}>
            <Button type="submit">+ Add</Button>
          </Col>
          <Col sm={{ span: 6 }}>
            <Button onClick={() => history.goBack()}>Cancel</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default CreateTaskForm;