const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post('/login', (req, res)=>{
  User.findOne({ sender : req.body.txAddress }, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('error')
    } else if (!result) {
      res.status(401).json({message : "없음"})
    } else {
      res.status(200).json({message : "성공"})
    }
  })
})

// 유저 정보 입력
router.post("/enroll", (req, res) => {
  User.findOne( {sender : req.body.sender }, (err, result) =>{
    if (result && result.sender){
      User.updateOne({sender: req.body.sender}, req.body,(err, result)=>{
        if(err){
          res.status(500).send("server error")
        }
        else{
          res.status(200).send("edit")
        }
      })

    } else {
      const user = new User(req.body);

      user.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error sigup new user please try again");
        } else {
          res.status(200).send("Success");
        }
      });
    }
  })
});

// 회원 수정
router.post("/update", (req, res) => {
  User.updateOne({ sender : req.body.sender }, { $set: req.body }, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: '서버 에러' })
    } else if (!result.n) {
      res.status(401).json({ message: '유저가 없다' })
    } else {
      res.status(200).json({ message: '업데이트 성공' })
    }
  })
})

// 신체 정보 찾기 
router.get("/userfind", (req, res) => {
  User.findOne({ sender : req.query.sender }, { _id: 0, __v: 0 }, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: "Find False" })
    } else if (!result) {
      res.status(401).json({ message: "유저가 존재하지 않습니다." })
    } else {
      res.status(200).json(result)
    }
  })
})

// 회원 탈퇴
router.post("/withdrawal", (req, res) => {
  User.deleteOne({ sender : req.body.sender }, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).json({error : 'Internal error please try again'})
    } else if(!result) {
      res.status(401).json({message : 'This user not exist.'}) 
    } else {
      res.status(200).json({ message: "삭제 성공" })
    }
  })
})

module.exports = router;
