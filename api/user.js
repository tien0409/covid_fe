import createAxios from '@/libs/axios';

const axios = createAxios('http://localhost:8080/api');

export const createNationalForm = (body) => axios.post('/users/national', body).then((_) => _.data);
