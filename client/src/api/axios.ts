import axios from "axios";

const api = axios.create({
  baseURL: "https://smartinfra-gis.onrender.com/api",
});

export default api;