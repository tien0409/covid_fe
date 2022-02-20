let client;

export function setClient(newClient) {
    client = newClient;
}

const _reqMethods = [
    'request', 'delete', 'get', 'head', 'options',
    'post', 'put', 'patch', 'setBaseURL', 'create',
];

const axios = {};

_reqMethods.forEach((_method) => {
    axios[_method] = function () {
        if (!client) throw new Error('apiClient not installed');
        // eslint-disable-next-line
        return client[_method].apply(null, arguments);
    };
});

export default axios;
