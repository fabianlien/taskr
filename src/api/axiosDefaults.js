import axios from "axios";

// axios.defaults.baseURL = "https://taskrapi.herokuapp.com/";
axios.defaults.baseURL = "https://8000-fabianlien-taskrapi-24mm8glripc.ws-eu47.gitpod.io/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
