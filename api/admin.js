import axios from '@/libs/axios';

const BASE_URL = 'http://localhost:8080/api/admin';

export const login = (body) => axios.post(`${BASE_URL}/login`, body).then((_) => _.data);
