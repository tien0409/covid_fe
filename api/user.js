import createAxios from '@/libs/axios';

const axios = createAxios('http://localhost:8080/api');

export const createNationalForm = (body) => axios.post('/users/national', body).then((_) => _.data);
export const createDomesticForm = (body) => axios.post('/users/domestic', body).then((_) => _.data);
export const createEntryForm = (body) => axios.post('/users/entry', body).then((_) => _.data);
