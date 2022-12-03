const express = require('express');
const User = require('../../models/user');
const hash = require('../../models/passwordHash');

const router = express.Router();

router.route('/')
  .post(async (req, res, next) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const nickname = req.body.nickname;
    const number = req.body.number;
    const birth = req.body.birth;
    const gender = req.body.gender;
    try {
      //const salt = await bcrypt.getSalt(10);
      //const hashedPassword = await bcrypt.hash(password, salt);

      //db에 해당 id, email, nickname이 있는지 확인(중복검사 위한 변수)
      let db_id = await User.findOne({attributes:['id'],where : {id : id}});
      let db_email = await User.findOne({attributes:['email'],where : {email : email}});
      let db_nickname = await User.findOne({attributes:['nickname'],where : {nickname : nickname}});

      //중복검사 후 user data 생성
      if(!db_id && !db_email && !db_nickname) {
        User.create({id : id, email : email, password : hash.passwordHash(password), name : name, nickname : nickname, birth:birth, gender:gender, number:number });
        res.status(200).json({ message: "회원가입이 완료되었습니다." })
      } else if(db_id != null) return res.status(400).json({ message: "이미 사용중인 아이디입니다." });
        else if(db_email != null)return res.status(400).json({ message: "이미 사용중인 이메일입니다." });
        else if(db_nickname != null)return res.status(400).json({ message: "이미 사용중인 닉네임입니다." });
        else return res.status(500).json({message: "오류가 발생하여 회업가입이 불가합니다."})
      }
     catch (err) {
        console.error(err);
}});

module.exports = router;