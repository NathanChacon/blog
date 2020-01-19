const Database = require('./db')


module.exports = {
    createCategory: (name) => {
        return Database('category').insert({name})
    },
    getAllCategories : () => {
        return Database.select('*').from('category')
    }
}