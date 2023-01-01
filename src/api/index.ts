import axios from "axios";

const api = axios.create({
  baseURL: "https://avl-frontend-exam.herokuapp.com/api",
});

export default api;
