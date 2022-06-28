import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";

const UpdateProfileForm = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    profile_image: "",
  });
  const { name, bio, profile_image } = profileData;
  const imageInput = useRef(null);
  const history = useHistory();
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        const { bio, name, profile_image } = data;
        if (currentUser.pk === parseInt(id)) {
          setProfileData({ bio, name, profile_image });
        } else {
          history.goBack();
        }
      } catch (error) {
        console.log(error);
      }
    };
    onMount();
  }, [id, history, currentUser, setProfileData]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(profile_image);
      setProfileData({
        ...profileData,
        profile_image: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("profile_image", imageInput.current.files[0])

    try {
      await axiosReq.put(`/profiles/${id}`, formData);
      history.push("/");
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) setErrors(error.response?.data);
    }
  };

  return (
    <Container style={{ width: "80%" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="text-center">
          {profile_image ? (
            <figure>
              <Image src={profile_image} rounded="true" fluid="true" />
            </figure>
          ) : (
            <Form.Label
              className="d-flex justify-content-center"
              htmlFor="image-upload"
            >
              <span>Click or tap to upload an image</span>
            </Form.Label>
          )}
          <Form.File
            id="image-upload"
            accept="image/*"
            onChange={handleImage}
            ref={imageInput}
          />
        </Form.Group>

        <Form.Group as={Row} controlId="name">
          <Form.Label className="d-none mg-b-20" column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {errors.name?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <Form.Group as={Row} controlId="bio">
          <Form.Label className="d-none mg-b-20" column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Write something about yourself..."
              name="bio"
              value={bio}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {errors.bio?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <Form.Group as={Row}>
          <Col sm={{ span: 4 }}>
            <Button type="submit">Save</Button>
          </Col>
          <Col sm={{ span: 6 }}>
            <Button onClick={() => history.push("/")}>Cancel</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default UpdateProfileForm;
