const express = require('express');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/')
  .post(async (req, res, next) => {
    try {
      const user = await User.findAll({
        attributes:['id','email','name','nickname','gender','birth','number'],
        where: { 
            id: req.body.id,
            password : req.body.password
        }
    })
    console.log("user", user);
    if(user != '') {
      let nickname = user[0].getDataValue('nickname');
        res.status(200).json({
          message : `${nickname}님 로그인 되었습니다.`,
          user : user,
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