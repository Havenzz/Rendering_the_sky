import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

// localhost使用的key字段
export const LOGIN_STATE_KEY = 'autoLogin';
