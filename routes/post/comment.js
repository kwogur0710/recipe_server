const express = require('express');
const User = require('../../models/user');
const Comment = require('../../models/comment');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  router.route('/save')
  .post(async (req, res, next) => {
    try {
      const getCommentNum = await Comment.findOne({attributes:['commentNum'], order:[['commentNum','desc']]});
      const comments = await Comment.create({
        commentNum : getCommentNum.dataValues.commentNum+1,
        postNum : req.body.postNum,
        id: req.body.id,
        nickname : req.body.nickname,
        contents : req.body.contents,
        makedate : Date.now()
      });
      res.status(201).json(comments);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  router.get('/get/postnum=:postNum', async (req, res, next) => {
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
  router.post('/delete', async (req, res, next) => {
    try {
      Comment.destroy({
        where: { postNum: req.body.postNum,
        commentNum: req.body.commentNum }
    });
      const comments = await Comment.findAll({
            where: { postNum: req.body.postNum }
        });
      res.json(comments);
    } catch (err) {
      console.error('err', err);
      next(err);
    }
  });

module.exports = router;