import axios from 'axios';
import {baseUrl} from '../constants'

const Axiosinstance = axios.create({
    baseURL: baseUrl,
  });
  
export default Axiosinstance;