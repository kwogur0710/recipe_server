const express = require('express');
const router = express.Router();

const login = require('./login.js');
const users = require('./user.js');
const register = require('./register.js');

router.use('/login', login);
router.use('/users', users);
router.use('/register', register);
module.exports = router;