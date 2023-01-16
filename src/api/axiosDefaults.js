import axios from "axios";

//Develpment mode:
axios.defaults.baseURL = "https://8000-fabianlien-taskrapi-24mm8glripc.ws-eu82.gitpod.io/";

//Production mode
//axios.defaults.baseURL = "https://taskr-api.herokuapp.com/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
