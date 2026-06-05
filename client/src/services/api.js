import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://hundredtools.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;