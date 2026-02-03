import axios from 'axios';

// Read base URL from Next.js environment variables.
// Use NEXT_PUBLIC_API_URL so it is available on both server and client.
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

// Create a reusable axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add request/response interceptors here if needed
// axiosInstance.interceptors.request.use(...);
// axiosInstance.interceptors.response.use(...);

export default axiosInstance;
