import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // console.log('token data', token)
    if (token) {
    //   console.log('Token found:', token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('No token found');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
