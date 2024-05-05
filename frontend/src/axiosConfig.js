import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://192.168.77.253:8080/dinedynamo', // Replace with your API base URL
  baseURL: "http://localhost:8082/", // Replace with your API base URL
  timeout: 8000, // Set a timeout for requests in milliseconds (optional)
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers you need
  },
});

export default axiosInstance;