import sendRequest from './send-request';

const BASE_URL = '/api/playlists';

export function searchAPI(search) {
    return sendRequest(`${BASE_URL}/searchAPI`, 'POST', search);
}

export function create(playlist) { 
    return sendRequest(`${BASE_URL}/create`, 'POST', playlist);
};

export function getUserPlaylists() { 
    return sendRequest(`${BASE_URL}/userPlaylists`);
};

export function update(playlist) {
    return sendRequest(`${BASE_URL}/update`, 'PUT', playlist);
};

export function deletePlaylist(id) {
    return sendRequest(`${BASE_URL}/delete/${id}`, 'DELETE');
};



