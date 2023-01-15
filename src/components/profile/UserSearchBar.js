import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";
import ProfilePreview from "../../pages/profile/ProfilePreview";
import styles from "../../styles/SearchBar.module.css";

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
    <Container>
      <Row>
        <Col xs={1}>
          <div className={styles.MagnifyingGlass}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </Col>
        <Col xs={10}>
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={userSearchQuery}
            onChange={(event) => setUserSearchQuery(event.target.value)}
            className={styles.SearchBar}
          />
        </Col>
      </Row>
      <Row className={styles.UserSearchQuery}>
        <Col md={{ span: 10, offset: 1 }}>
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
                    <Row className={styles.NoTasksBox}>
                      <Col>
                        No usernames containing "{userSearchQuery}" found.
                      </Col>
                    </Row>
                  )}
                </>
              ) : (
                <Row className={styles.NoTasksBox}>
                  <Col>
                    <Spinner animation="border" className={styles.Spinner} />
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserSearchBar;
