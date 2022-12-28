import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ProfilePreview = ({ profile, setUserSearchQuery }) => {
  const { id, owner, name, profile_image, bio } = profile;

  return (
    <div>
      <Card.Body onClick={() => setUserSearchQuery("")}>
        <Link to={`/profile/${id}/`}>
          <Card.Img src={profile_image} alt="profile image" />
            {name.length ? (
                <Card.Title>{name}</Card.Title>
            ) : (
                <Card.Title>{owner}</Card.Title>
            )}
          <Card.Text>
            <span>{bio}</span>
          </Card.Text>
        </Link>
      </Card.Body>
    </div>
  );
};

export default ProfilePreview;
