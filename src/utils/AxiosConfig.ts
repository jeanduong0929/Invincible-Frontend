import axios from "axios";

const INV_API = axios.create({
  baseURL: "http://localhost:8080/invincible",
  headers: {
    "Content-Type": "application/json",
  },
});

export default INV_API;
