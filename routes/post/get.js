const express = require('express');
const User = require('../../models/user');
const Comment = require('../../models/comment');

const router = express.Router();

router.get('/postnum=:postNum/', async (req, res, next) => {
    try {
      const comments = await Comment.findAll({
            where: { postNum: req.params.postNum }
        });
      res.json(comments);
    } catch (err) {
      console.error('err', err);
      next(err);
    }
  });
  
  module.exports = router;