import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";

const UserSearchBar = ({setProfilesPreview, userSearchQuery, setUserSearchQuery}) => {
  
  useEffect(() => {
    const fetchQuery = async () => {
        try {
            const { data } = await axiosReq.get(`/profiles/?search=${userSearchQuery}`);
            if (userSearchQuery.length) {
              setProfilesPreview(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const searchTimer = setTimeout(() => {
      fetchQuery();
    }, 800)
    return () => {
      clearTimeout(searchTimer)
    }
  }, [userSearchQuery, setProfilesPreview])

  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <Form.Control
        type="text"
        placeholder="Search users..."
        value={userSearchQuery}
        onChange={(event) => setUserSearchQuery(event.target.value)}
      />
    </Form>
  );
};

export default UserSearchBar;
