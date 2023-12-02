import axios from 'axios';
import { baseUrl } from '../constants';
import jwt_decode from 'jwt-decode';

const Axiosinstance = axios.create({
  baseURL: baseUrl,
});

Axiosinstance.interceptors.request.use(
  config => {
      const token = localStorage.getItem('authTokens');
      console.log("token", token);
      const tokenObject = JSON.parse(token);
      console.log("tokenObject",tokenObject.access)
      if (token) {
          config.headers['Authorization'] = `Bearer ${tokenObject.access}`;
      }
      // config.headers['Content-Type'] = 'application/json';
      console.log("config",config)
      return config; // Don't forget to return the config object
  },
  error => {
      return Promise.reject(error);
  }
);

export default Axiosinstance;
