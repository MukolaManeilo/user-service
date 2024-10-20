import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // базовий URL вашого API
});

export const fetchUsers = () => api.get('/users');
export const createUser = (user: { name: string; email: string }) => api.post('/users', user);
