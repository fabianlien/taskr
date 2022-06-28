import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";

const SearchBar = ({setProfilesPreview, searchQuery, setSearchQuery}) => {
  
  useEffect(() => {
    const fetchQuery = async () => {
        try {
            const { data } = await axiosReq.get(`/profiles/?search=${searchQuery}`);
            if (searchQuery.length) {
              setProfilesPreview(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchQuery();
  }, [searchQuery, setProfilesPreview])

  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <Form.Control
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </Form>
  );
};

export default SearchBar;
