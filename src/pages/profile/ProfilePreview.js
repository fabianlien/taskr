import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import styles from "../../styles/ProfilePreview.module.css";

const ProfilePreview = ({ profile, setUserSearchQuery }) => {
  const { id, owner, name, profile_image } = profile;

  return (
    <Card className={styles.ProfilePreviewCard}>
      <Card.Body onClick={() => setUserSearchQuery("")} className={styles.ProfilePreviewCard}>
        <Link to={`/profile/${id}/`}>
            <Row>
              <Col xs={1} md={2} className={styles.ImageContainer}>
                <Card.Img
                  className={styles.ProfilePreviewImage}
                  src={profile_image}
                  alt="profile image"
                />
              </Col>
              <Col xs={11} md={10} className={styles.NameContainer}>
                {name.length ? (
                  <>
                    <Card.Title className={styles.Owner}>{owner}</Card.Title>
                    <Card.Title className={styles.Name}>{name}</Card.Title>
                  </>
                ) : (
                  <Card.Title className={styles.Name}>{owner}</Card.Title>
                )}
              </Col>
            </Row>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProfilePreview;
