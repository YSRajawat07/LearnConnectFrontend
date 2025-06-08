import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// const API = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
// });
import API from '../api/axios';
import { apiAuth } from '../api/axios';

export const loginUser = (data) => API.post('/auth/login/', data);
export const registerUser = (data) => apiAuth.post('/auth/register/', data);
export const getLectures = (params) => API.get('/lectures', params);
export const createLecture = (data) => API.post('/lectures/', data);
// export const updateLecture = (id, data) => API.put(`/lectures/${id}`, data);
// export const deleteLecture = (id) => API.delete(`/lectures/${id}`);
// export const updateUser = (data) => API.put('/user', data);
