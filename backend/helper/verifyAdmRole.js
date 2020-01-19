const userTable = require('../api/userDatabase')

const verifyAdmRole = (req,res,next) => {
    const userId = req.userId
    console.log('passei aqui')
   userTable.getUserById(userId)
    .then((result) => {
        if(result[0].rol !== 'adm'){
          return res.status(403).send()
        }
        else{
            return next()
        }
       
    })
    .catch((e) => {
        console.log(e)
    })
}

module.exports = verifyAdmRole