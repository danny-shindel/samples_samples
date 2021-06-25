const express = require('express');
const router = express.Router();
const playlistsCtrl = require('../../controllers/api/playlists');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/playlist/seachAPI
router.post('/searchAPI', playlistsCtrl.searchAPI);
// POST /api/playlists/create
router.post('/create', playlistsCtrl.create);
// GET /api/playlists/userPlaylist
router.get('/userPlaylists', playlistsCtrl.getUserPlaylists);
router.put('/update', playlistsCtrl.update);
router.delete('/delete/:id', playlistsCtrl.deletePlaylist);

module.exports = router;