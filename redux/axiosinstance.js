import axios from 'axios';
import { toast } from 'react-toastify';

const { VITE_SERVER_URL } = process.env;

// Create a new Axios instance
const api = axios.create({
  baseURL: `${VITE_SERVER_URL}`,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    return config;
  },
  (error) => {
    toast.error('Something went wrong');
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response errors (e.g., 404, 500, etc.)
    if (error.response) {
      const { status } = error.response;

      if (status === 404) {
        toast.error('Server Error: The requested resource is not available');
        // window.location.href = '/error404'; //Replace with the desired URL
      } else if (status === 401) {
        toast.error('Server Error: Unauthorised request');
      } else if (status === 500) {
        toast.error('Internal server error');
      } else {
        toast.error('Server Error: Something went wrong');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
