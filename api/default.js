import axios from '@/libs/axios';

const BASE_URL = 'http://localhost:8080/api';

export const getVaccines = () => axios.get(`${BASE_URL}/vaccines`).then((_) => _.data);
export const getVaccine = (id) => axios.get(`${BASE_URL}/vaccines/${id}`).then((_) => _.data);
export const updateVaccine = (id, body) => axios.put(`${BASE_URL}/vaccines/${id}`, body).then((_) => _.data);
export const createVaccine = (body) => axios.post(`${BASE_URL}/vaccines`, body).then((_) => _.data);
export const removeVaccine = (id) => axios.delete(`${BASE_URL}/vaccines/${id}`).then((_) => _.data);

export const getInfectedSubject = () => axios.get(`${BASE_URL}/infected-subject`).then((_) => _.data);
export const getSymptoms = () => axios.get(`${BASE_URL}/infected-subject/symptoms`).then((_) => _.data);
export const getProvinces = () => axios.get(`${BASE_URL}/provinces`).then((_) => _.data);
export const getCSCL = () => axios.get(`${BASE_URL}/infected-subject/cscl`).then((_) => _.data);
