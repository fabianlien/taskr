import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/UpdateProfileForm.module.css";
import { Card } from "react-bootstrap";

const UpdateProfileForm = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    profile_image: "",
  });
  const { name, bio, profile_image } = profileData;
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onMount = async () => {
      if (currentUser.pk === parseInt(id)) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}`);
          const { bio, name, profile_image } = data;
          setProfileData({ bio, name, profile_image });
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate(-1);
      }
    };
    onMount();
  }, [id, navigate, currentUser, setProfileData]);

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
        profile_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (imageInput?.current?.files[0]) {
      formData.append("profile_image", imageInput?.current?.files[0]);
    }

    try {
      await axiosReq.put(`/profiles/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) setErrors(error.response?.data);
    }
  };

  return (
    <Container fluid className={styles.Container}>
      <Card className={styles.EditProfileCard}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className={styles.ProfileTextBox}>
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
            <Row>
              <Col sm={{ span: 6, offset: 3 }} md={{ span: 6, offset: 4 }}>
                <Form.File
                  className={styles.UploadButton}
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImage}
                  ref={imageInput}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group as={Row} controlId="name">
            <Form.Label className="d-none mg-b-20" column sm={2}>
              Name
            </Form.Label>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
              <Form.Control
                className={styles.Text}
                type="text"
                size="lg"
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
              Biography
            </Form.Label>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
              <Form.Control
                className={styles.Bio}
                as="textarea"
                size="lg"
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
            <Col sm={{ span: 6, offset: 1 }} md={{ span: 3, offset: 2 }}>
              <Button
                className={styles.ConfirmButton}
                type="submit"
                variant="warning"
              >
                Save
              </Button>
            </Col>
            <Col sm={{ span: 4 }} md={{ span: 3, offset: 2 }}>
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
      </Card>
    </Container>
  );
};

export default UpdateProfileForm;
