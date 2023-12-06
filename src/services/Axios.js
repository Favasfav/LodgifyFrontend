import axios from 'axios';
import { baseUrl } from '../constants';
import jwt_decode from 'jwt-decode';

const Axiosinstance = axios.create({
  baseURL: baseUrl,
});

Axiosinstance.interceptors.request.use(
  config => {
    console.log("interceptors")
  
      const token = localStorage.getItem('authTokens');
      console.log("token", token);
      const tokenObject = JSON.parse(token);
     
      if (token) {
          config.headers['Authorization'] = `Bearer ${tokenObject.access}`;
      }
      
      console.log("config",config)
      return config; 
  },
  error => {
    console.log("hlooo")
      return Promise.reject(error);
  }
);

export default Axiosinstance;
