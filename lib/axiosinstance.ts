import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const axiosintance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


// Response interceptor for global error handling
axiosintance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling logic
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        `API Error: ${error.response.status} - ${error.response.data?.message || error.message}`
      );

      // Example: Redirect to login on 401 Unauthorized
      if (error.response.status === 401) {
        console.warn("Unauthorized - Redirecting to login");
      }
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }
    // Forward error for local handling if needed
    return Promise.reject(error);
  }
);

export { axiosintance };
