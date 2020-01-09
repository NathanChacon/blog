const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config()
const app = express()
const auth = require('./routes/authentication')

app.use(bodyParser.json())

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use('/authentication',auth)

app.listen(process.env.PORT || '8080', () => {
    console.log('server rodando')
})