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

const getToken = () => localStorage.getItem('token');

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