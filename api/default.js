import createAxios from '@/libs/axios';

const axios = createAxios('http://localhost:8080/api');

export const getVaccines = () => axios.get('/vaccines').then((_) => _.data);
