const express = require('express');
const User = require('../../models/user');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        id: req.body.id,
        password : req.body.password,
        name : req.body.name,
        nickname : req.body.nickname,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/', async (req, res, next) => {
  try {
    console.log('User',User);
    const users = await User.findAll({
          where: { id: req.params.id }
      });
    console.log(users);
    res.json(users);
  } catch (err) {
    console.error('err', err);
    next(err);
  }
});

module.exports = router;