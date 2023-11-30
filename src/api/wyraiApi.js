import axios from "axios";
import { getAuthToken } from "../Utils/authUtils";

// Create an instance of Axios
const wyraiApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // Other configurations
});

// Add a request interceptor
wyraiApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    config.headers["authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
wyraiApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default wyraiApi;
