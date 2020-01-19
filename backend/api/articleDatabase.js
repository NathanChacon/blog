const Database = require('./db')


module.exports = {
    createArticle: (content,categoryId) => {
        return Database('article').insert({content,categoryId})
    }
}