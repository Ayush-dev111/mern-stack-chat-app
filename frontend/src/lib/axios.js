import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3500/api" : "https://mern-stack-chat-app-x4ny.onrender.com",
  withCredentials: true,
});