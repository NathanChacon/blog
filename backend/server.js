const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config()
const app = express()
const auth = require('./routes/authentication')
const category = require('./routes/category')
const adm = require('./routes/administration')

const verifyJWT = require('./helper/jwt')
const verifyAdmRole = require('./helper/verifyAdmRole')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use('/authentication',auth)
app.use('/category',category)
app.use('/adm',verifyJWT,verifyAdmRole,adm)

app.listen(process.env.PORT || '8080', () => {
    console.log('server rodando')
})