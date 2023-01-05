import axios from "axios";

// Deployed environment:
//axios.defaults.baseURL = "https://taskrapi.herokuapp.com/";

// Dev environment:
axios.defaults.baseURL = "https://8000-fabianlien-taskrapi-24mm8glripc.ws-eu80.gitpod.io";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
