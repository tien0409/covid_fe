import axios from '@/libs/axios';

const BASE_URL = 'http://localhost:8080/api';

export const createNationalForm = (body) => axios.post(`${BASE_URL}/users/national`, body).then((_) => _.data);
export const createDomesticForm = (body) => axios.post(`${BASE_URL}/users/domestic`, body).then((_) => _.data);
export const createEntryForm = (body) => axios.post(`${BASE_URL}/users/entry`, body).then((_) => _.data);
