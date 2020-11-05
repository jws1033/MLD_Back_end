var router = require('express').Router()

const userRouter = require('./userRouter')
const surveyRouter = require('./surveyRouter')

router.use('/user', userRouter)
router.use('/survey', surveyRouter)

module.exports = router;