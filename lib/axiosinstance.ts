import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // crucial for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
