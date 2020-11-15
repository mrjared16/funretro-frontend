import axios from 'axios';
import queryString from 'query-string';

const host = 'localhost:3001';
const baseURL = `http://${host}`
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params)
});

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsInVzZXJJZCI6IjgyZjRhOGU4LWU2NGYtNGI0Ni1iM2EzLWZlMjQ2NjNhNWIwOSIsImlhdCI6MTYwNTQ2Njk5N30.qHgZojK9IT6TWltv-TI6aTR3MPfhJSVk9rHFwaRyLKE';
const getToken = () => dummyToken;

axiosClient.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;