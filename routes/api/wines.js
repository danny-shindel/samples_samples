const express = require('express');
const router = express.Router();
const winesCtrl = require('../../controllers/api/wines');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/wines
router.post('/', winesCtrl.search);

// GET /api/wines
router.get('/', winesCtrl.getTitles);

// PUT /api/wine/id
router.put('/:id', winesCtrl.addPlaylist);

module.exports = router;