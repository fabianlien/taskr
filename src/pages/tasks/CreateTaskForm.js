import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/CreateTaskForm.module.css";
import { Card, Spinner } from "react-bootstrap";
import Switch from "react-custom-checkbox/switch";

const CreateTaskForm = ({ toast }) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [taskTextData, setTaskTextData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = taskTextData;
  const [dateTime, setDateTime] = useState(new Date());
  const [checkedPriority, setCheckedPriority] = useState(false);
  const [checkedPublic, setCheckedPublic] = useState(true);
  const [requestAccepted, setRequestAccepted] = useState("0");
  const [errors, setErrors] = useState({});
  const [taskRequestProfileData, setTaskRequestProfileData] = useState({});
  const is_owner = currentUser?.username === id;

  useEffect(() => {
    const onMount = async () => {
      if (is_owner === false) {
        setRequestAccepted("no");
        try {
          const { data } = await axiosReq.get(
            `/profiles/?owner__username=${id}`
          );
          setTaskRequestProfileData(data);
          setPageLoading(false);
        } catch (error) {
          console.log(error);
          navigate(-1);
        }
      } else {
        setPageLoading(false);
      }
    };
    if (pageLoading) {
      onMount();
    }
  }, [is_owner, id, navigate, pageLoading]);

  const handleChange = (event) => {
    setTaskTextData({
      ...taskTextData,
      [event.target.name]: event.target.value,
    });
  };

  const toggleBool = (value) => !value;

  const clearForm = () => {
    setTaskTextData({ title: "", description: "" });
    setDateTime(new Date());
    setCheckedPriority(false);
    setCheckedPublic(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_by", dateTime.toISOString());
    formData.append("is_important", checkedPriority);
    formData.append("is_public", checkedPublic);
    formData.append("request_accepted", requestAccepted);
    if (requestAccepted === "no") {
      formData.append("owner", taskRequestProfileData.results?.[0].owner);
      formData.append("requested_ID", currentUser.pk);
      formData.append("requested_username", currentUser.username);
    } else {
      formData.append("owner", currentUser.username);
    }

    try {
      const post = await axiosReq.post("/tasks/", formData);
      navigate(`/task/${post.data.id}`);
      if (requestAccepted === "no") {
        toast(
          `"${title}" request has been sent to ${taskRequestProfileData.results?.[0].owner}`
        );
      } else {
        toast(`"${title}" was added to your active tasks.`);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) setErrors(error.response?.data);
    }
  };

  return (
    <Container className={styles.Container}>
      {pageLoading ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Card className="p-2">
            <Card.Header onClick={clearForm} className={styles.Heading}>
              {is_owner ? "Create a new Task" : "Make a new Request"}
            </Card.Header>
            <Form.Group as={Row} classcontrolId="title">
              <Form.Label className="d-none">Title</Form.Label>
              <Col sm={{ span: 10, offset: 1 }} className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  className={styles.TitleField}
                />
              </Col>
            </Form.Group>
            {errors.title?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <Form.Group as={Row} controlId="dateTime">
              <Col sm={{ span: 10, offset: 1 }} className="mt-2">
                <Row>
                  <Col md={2} className={styles.DueBox}>
                    Due By
                  </Col>
                  <Col md={10}>
                    <DatePicker
                      className={styles.DateTimePicker}
                      selected={dateTime}
                      onChange={(date) => setDateTime(date)}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  </Col>
                </Row>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="description">
              <Form.Label className="d-none mg-b-20" column sm={2}>
                Description
              </Form.Label>
              <Col sm={{ span: 10, offset: 1 }} className="mt-2">
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  className="mb-3"
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
                <Col sm={{ span: 10, offset: 1 }} className="mt-2">
                  <Switch
                    label="High Priority"
                    name="priority"
                    checked={checkedPriority}
                    onChange={() => setCheckedPriority(toggleBool)}
                    className={styles.CheckBox}
                  />
                </Col>
              </Form.Group>
            </fieldset>

            <fieldset>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 1 }} className="mt-2">
                  <Switch
                    type="switch"
                    label="Visible to public"
                    name="public"
                    checked={checkedPublic}
                    onChange={() => setCheckedPublic(toggleBool)}
                    className={styles.CheckBox}
                  />
                </Col>
              </Form.Group>
            </fieldset>
          </Card>

          <Form.Group as={Row}>
            <Col sm={{ span: 6 }} lg={{ span: 3 }} className="mt-3">
              <Button
                type="submit"
                variant="warning"
                className={styles.ConfirmButton}
              >
                {requestAccepted !== "no" ? "+ Add" : "+ Send"}
              </Button>
            </Col>
            <Col sm={{ span: 6 }} lg={{ span: 3 }} className="mt-3">
              <Button
                className={styles.CancelButton}
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      )}
    </Container>
  );
};

export default CreateTaskForm;
