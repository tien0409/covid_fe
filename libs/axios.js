import axios from 'axios';

// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) {
//         return parts.pop().split(';').shift();
//     }
//
//     return '';
// };

const createAxios = (apiHost) => {
    const baseURL = apiHost;
    const _axios = axios.create({
        baseURL,
        headers: {
            'content-type': 'application/json',
        },
    });

    //     if (process.browser === true) {
    //         const token = getCookie('auth._token.local');
    //         _axios.interceptors.request.use((config) => {
    //             config.headers.Authorization = decodeURI(token);
    //
    //             return config;
    //         });
    //     }

    return _axios;
};

export default createAxios;
