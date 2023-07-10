import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

export default client;
