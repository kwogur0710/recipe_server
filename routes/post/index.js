const express = require('express');
const router = express.Router();

const comment = require('./comment.js');

router.use('/comment', comment);
module.exports = router;