import axios from 'axios';
import queryString from 'query-string';

const baseURL = process.env.REACT_APP_API_URL;
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
  // console.log({ error });
  throw error.response.data;
});

export default axiosClient;