const express = require("express");
const router = express.Router();
const ethereumTx = require("./ethereum/ethereumTx");
const Survey = require("../models/Survey");

// 설문지 찾기 history
router.get("/surveyfind", async(req, res) => {
  const result = await ethereumTx.query(req.query)

  let surveys = {}
  for(let survey of result) {
    if(survey[0] === req.query.createAt){
      surveys = {
        createAt: survey[0],
        surveyNum: survey[1],
        surveyQuestion: survey[2],
        surveyResult: survey[3]
      }
    }
  }

  if(result) {
      res.status(200).json({result : surveys, message : "Success"})
  } else {
      res.status(401).json({message : "Fail"})
  }
});

// 설문지 찾기 list
router.get("/surveylist", async(req, res) => {
  const result = await ethereumTx.query(req.query)

  if(result) {
      res.status(200).json({result : result, message : "Success"})
  } else {
      res.status(401).json({message : "Fail"})
  }
});

// 설문지 제출
router.post("/submit", async(req, res) => {
  req.body.createAt = new Date().toISOString().substring(0, 10)
  
  // request.sender, request.createAt, request.surveyNum, request.surveyQuestion, request.surveyResult
  const result = await ethereumTx.invoke(req.body)

  // req.body.surveyResult
  console.log(result)

  if(result) {
      res.status(200).json({result : "", message : "Success"})
  } else {
      res.status(401).json({message : "Fail"})
  }
});

//질문 작성
router.post("/create", (req, res) => {
    const survey = new Survey(req.body);
  
    survey.save((err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error sigup new user please try again");
      } else {
        res.status(200).send("Success");
      }
    });
  });

//질문 불러오기
router.get("/load", (req, res) => {
    Survey.find({}, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: "Find False" })
      } else if (!result) {
        res.status(401).json({ message: "질문이 존재하지 않습니다." })
      } else {
        // Mongoose공부. 
        // JS공부

        // express.js Mongoose
        const idx = Math.floor(Math.random() * (result.length))
        
        res.status(200).json(result[idx])
      }
    })
  })

module.exports = router