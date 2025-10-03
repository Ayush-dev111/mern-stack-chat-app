import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mern-stack-chat-app-x4ny.onrender.com/api",
  withCredentials: true,
});