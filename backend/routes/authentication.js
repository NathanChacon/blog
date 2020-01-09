const express = require('express')
const route = express.Router()
const bcrypt = require('bcryptjs')
const userDb = require('../api/userDatabase')
const uuidv4 = require('uuid/v4')

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
         message: e
     })
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err){
            return res.status(500).send()
        }
        userDb.createUser(id,name,hash)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
  });

})

const verifyFields =  async (name,password,confirmPassword) => {
    return new Promise((resolve,reject) => {
        if(name === null || !name || name === ''){
            reject('Preencha as informações corretament')
        }
     
        if(password === null || !password || password === ''){
            reject('Preencha as informações corretament')
        }
     
        if(confirmPassword === null || !confirmPassword || confirmPassword === ''){
            reject('Preencha as informações corretament')
        }
     
        if(password.length < 8){
            reject('Preencha as informações corretament')
        }
     
        if(password !== confirmPassword){
            reject('Preencha as informações corretament')
        }

        resolve()
    })
}

const verifyUsernameOnDatabase = async (name) => {
    return new Promise((resolve,reject) => {
        userDb.getUserName(name)
        .then((name) => {
            if(name.length === 0){
                resolve()
            }else{
                reject('nome registrado')
            }
        })
        .catch((error) => {
             reject('erro no servidor')
        })
    })

}

module.exports = route