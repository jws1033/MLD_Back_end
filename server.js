const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const apiRouter = require('./router/apiRouter')

const app = express()

require('dotenv').config()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('pubilc'))

//Connection Mongo DB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err)
    else console.log('DB Connected')
})

//Add Routing File List on Middleware
app.use('/api', apiRouter)

//Start Server
PORT=process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is Starting http://localhost:${PORT}`)
})