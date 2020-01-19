const express = require('express')
const route = express.Router()
const bcrypt = require('bcryptjs')
const userTable = require('../api/userDatabase')
const uuidv4 = require('uuid/v4')
const jwt = require('jsonwebtoken')
const verifyJwt = require('../helper/jwt')
const dotenv = require('dotenv');
dotenv.config()

route.post('/createAccount', async (req,res,next) => {
   const name = req.body.name
   const password = req.body.password
   const confirmPassword = req.body.confirmPassword
   const saltRounds = 10;
   const id = uuidv4()
   
   try{
     await verifyFields(name,password,confirmPassword)
     await verifyUsernameOnDatabase(name)
   }
   catch(e){
     return res.status(400).send({
        input: e.input, 
        message: e.message
     })
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err){
            return res.status(500).send()
        }
        userTable.createUser(id,name,hash)
        .then((response) => {
            res.status(200).send()
        })
        .catch((error) => {
            console.log(error)
        })
  });

})

const verifyFields =  async (name,password,confirmPassword) => {
    return new Promise((resolve,reject) => {
        if(name === null || !name || name === ''){
            reject({input: 'name', message: 'Esse campo é obrigatório'})
        }

        if(name.length < 3 || name.length > 15){
            reject({input: 'name', message: 'Deve possuir no minimo 3 caracteres e no máximo 15'})
        }

        if (/^\s+$/.test(name)){
            reject({input: 'name', message: 'Nome inválido'})
        }
     
        if(password === null || "" || !password){
            reject({input: 'password', message: 'Esse campo é obrigatório'})
        }
        if (/^\s+$/.test(password)){
            reject({input: 'password', message: 'Senha inválida'})
        }

        if(password.length < 8){
            reject({input: 'password', message: 'Senha deve ter no minimo 8 caracteres'})
        }
        
        if(confirmPassword === null || "" || !confirmPassword){
            reject({input: 'confirmPassword', message: 'Esse campo é obrigatório'})
        }
        if(password !== confirmPassword){
            reject({input: 'confirmPassword', message: 'As senhas não são idênticas'})
        }

        resolve()
    })
}

route.post('/login',(req,res,next) => {

    const name = req.body.name
    const password = req.body.password

    userTable.getUser(name)
    .then((result) => {
        if(result.length === 0){
            return res.status(400).send('usuario nao cadastrado')
        }
        bcrypt.compare(password, result[0].password, function(err, response) {
            if (err){
              return res.status(400).send('Senha incorreta')
            }
            if (response){
                const userId = result[0].id
                const userName = result[0].name
                const userRol = result[0].rol

                const token = jwt.sign({userId}, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                  });
                  res.status(200).send({ auth: true, userName: userName, userRol: userRol, token: token });
            } else {
               return res.status(400).send('Senha incorreta')
            }
        });
    })
    .catch((error) => {
        return res.status(500).send('erro no servidor')
    })
})

route.get('/checkUser',verifyJwt,(req,res,next) => {
     userTable.getUserById(req.userId)
     .then((result) => {
         console.log(result)
        res.status(200).send({
            userName: result[0].name,
            userRol: result[0].rol
        })
     })
     .catch((error) => {
        console.log(error)
     })
})

const verifyUsernameOnDatabase = async (name) => {
    return new Promise((resolve,reject) => {
        userTable.getUserName(name)
        .then((name) => {
            if(name.length === 0){
                resolve()
            }else{
                reject({input:'name',message:'nome já registrado'})
            }
        })
        .catch((error) => {
             reject('erro no servidor')
        })
    })
}

module.exports = route