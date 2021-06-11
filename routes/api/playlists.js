const express = require('express');
const router = express.Router();
const playlistsCtrl = require('../../controllers/api/playlists');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/playlists
router.post('/searchAPI', playlistsCtrl.searchAPI);



module.exports = router;