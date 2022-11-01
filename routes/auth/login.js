const express = require('express');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/')
  .post(async (req, res, next) => {
    try {
      const user = await User.findAll({
        attributes:['id','nickname'],
        where: { 
            id: req.body.id,
            password : req.body.password
        }
    })
    let nickname;
    console.log("user", user);
    if(user != '') {
      nickname = user[0].getDataValue('nickname');
    }
    if(user != ''){
        res.status(200).json({
          message : `${nickname}님 로그인 되었습니다.`,
          token: jwt.sign({
            type:'JWT',
            id: req.body.id,
            password: req.body.password
          }, process.env.SECRET_KEY, {
            expiresIn:'15m',
            issuer: process.env.issuer
          })
        });
      }else return res.status(400).json({ message: '아이디 또는 패스워드가 일치하지 않습니다.'});
  } catch (err) {
      console.error(err);
      next(err);
    }
  });
module.exports = router;