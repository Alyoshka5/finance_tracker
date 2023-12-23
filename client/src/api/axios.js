import axios from 'axios';

export const axiosPrivate = axios.create({
    headers: { 'Contet-Type': 'application/json' },
    withCredentials: true
});