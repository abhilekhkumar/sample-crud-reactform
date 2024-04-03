import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3030/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default Api;
