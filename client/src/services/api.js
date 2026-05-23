import axios from "axios";

const api = axios.create({
   baseURL: "https://hundredtools.onrender.com/api"
});

export default api;