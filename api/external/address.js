import createAxios from '@/libs/axios';

const axios = createAxios('https://provinces.open-api.vn/api');

export const getProvinces = () => axios.get('/p').then((_) => _.data);
export const getDistricts = (provinceCode) => axios.get(`/d/${provinceCode}`).then((_) => _.data);
