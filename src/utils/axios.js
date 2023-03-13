import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reviews-project-api-production.up.railway.app/api'
});

export default api;
