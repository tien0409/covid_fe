import { setClient } from '@/libs/axios';

export default ({ $axios }) => {
    setClient($axios);
};
