import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";
import ProfilePreview from "../pages/profile/ProfilePreview";

const UserSearchBar = () => {
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilesPreview, setProfilesPreview] = useState({ results: [] });

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await axiosReq.get(
          `/profiles/?search=${userSearchQuery}`
        );
        if (userSearchQuery.length) {
          setProfilesPreview(data);
          setHasLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setHasLoaded(false);
    const searchTimer = setTimeout(() => {
      fetchQuery();
    }, 800);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [userSearchQuery, setProfilesPreview, setHasLoaded]);

  return (
    <div>
      <Form onSubmit={(event) => event.preventDefault()}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={userSearchQuery}
          onChange={(event) => setUserSearchQuery(event.target.value)}
        />
      </Form>
      {userSearchQuery.length ? (
        <>
          {hasLoaded ? (
            <>
              {profilesPreview.results.length ? (
                <>
                  {profilesPreview.results.map((profile, index) => {
                    return (
                      <ProfilePreview
                        key={index}
                        profile={profile}
                        setUserSearchQuery={setUserSearchQuery}
                        setHasLoaded={setHasLoaded}
                      />
                    );
                  })}
                </>
              ) : (
                <strong>
                  No usernames containing "{userSearchQuery}" found.
                </strong>
              )}
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserSearchBar;
