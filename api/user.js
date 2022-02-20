import axios from '@/libs/axios';

const BASE_URL = 'http://localhost:8080/api';

export const createNationalForm = (body) => axios.post(`${BASE_URL}/users/national`, body).then((_) => _.data);
export const getNationalSheets = () => axios.get(`${BASE_URL}/users/national`).then((_) => _.data);
export const getNationalForm = (id) => axios.get(`${BASE_URL}/users/national/${id}`).then((_) => _.data);

export const createDomesticForm = (body) => axios.post(`${BASE_URL}/users/domestic`, body).then((_) => _.data);
export const getDomesticSheets = () => axios.get(`${BASE_URL}/users/domestic`).then((_) => _.data);

export const createEntryForm = (body) => axios.post(`${BASE_URL}/users/entry`, body).then((_) => _.data);
export const getEntrySheets = () => axios.get(`${BASE_URL}/users/entry`).then((_) => _.data);

export const getHistory = (body) => axios.post(`${BASE_URL}/users/history`, body).then((_) => _.data);
