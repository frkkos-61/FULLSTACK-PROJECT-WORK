import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6154",
});


export default api;