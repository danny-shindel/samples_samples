import sendRequest from './send-request';

const BASE_URL = '/api/wines';

export function search(search) {
    return sendRequest(BASE_URL, 'POST', search);
}

export function getAll() {
    return sendRequest(BASE_URL, 'GET');
}
