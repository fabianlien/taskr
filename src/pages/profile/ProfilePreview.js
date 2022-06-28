import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ProfilePreview = ({ profile }) => {
  const { id, owner, name, profile_image, bio } = profile;

  return (
    <div>
      <Card.Body>
        <Link to={`/profile/${id}/`}>
          <Card.Img src={profile_image} alt="profile image" />
            {name.length ? (
                <Card.Title>{name}</Card.Title>
            ) : (
                <Card.Title>{owner}</Card.Title>
            )}
          <Card.Text>
            <p>{bio}</p>
          </Card.Text>
        </Link>
      </Card.Body>
    </div>
  );
};

export default ProfilePreview;
