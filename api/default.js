import createAxios from '@/libs/axios';

const axios = createAxios('http://localhost:8080/api');

export const getVaccines = () => axios.get('/vaccines').then((_) => _.data);
export const getInfectedSubject = () => axios.get('/infected-subject').then((_) => _.data);
export const getSymptoms = () => axios.get('/infected-subject/symptoms').then((_) => _.data);
export const getProvinces = () => axios.get('/provinces').then((_) => _.data);
export const getCSCL = () => axios.get('/infected-subject/cscl').then((_) => _.data);
