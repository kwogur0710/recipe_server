const express = require('express');
const router = express.Router();

const main = require('./main.js');
const auth = require('./auth/index.js');
const post = require('./post/index.js');

router.use('/main', main);
router.use('/auth', auth);
router.use('/post', post);
module.exports = router;