const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.post('/', usersCtrl.create);
// POST /api/users/signup
router.post('/signup', usersCtrl.createNoPic);
// POST /api/users/login
router.post('/login', usersCtrl.login);
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
//GET /api/users/names
router.get('/names', usersCtrl.getAllNames);

module.exports = router;