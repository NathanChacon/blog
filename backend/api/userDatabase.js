const Database = require('./db')

module.exports = {
    createUser: (id,name,password,) => {
       return Database('user').insert({id,name,password})
    },
    getUserName: (name) => {
     return Database('user').select('name').where({name})
    }
}