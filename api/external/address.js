import axios from '@/libs/axios';

const BASE_URL = 'https://provinces.open-api.vn/api';

export const getProvinces = () => axios.get(`${BASE_URL}/p`).then((_) => _.data);
export const getDistricts = (provinceCode) => axios.get(`${BASE_URL}/p/${provinceCode}`, { params: { depth: 2 } })
    .then((_) => _.data);
export const getWards = (districtCode) => axios.get(`${BASE_URL}/d/${districtCode}`, { params: { depth: 2 } })
    .then((_) => _.data);
