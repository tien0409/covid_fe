import createAxios from '@/libs/axios';

const axios = createAxios('https://provinces.open-api.vn/api');

export const getProvinces = () => axios.get('/p').then((_) => _.data);
export const getDistricts = (provinceCode) => axios.get(`/p/${provinceCode}`, { params: { depth: 2 } })
    .then((_) => _.data);
export const getWards = (districtCode) => axios.get(`d/${districtCode}`, { params: { depth: 2 } })
    .then((_) => _.data);
