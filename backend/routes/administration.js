const express = require('express')
const categoryTable = require('../api/categoryDatabase')
const route = express.Router()


route.post('/createCategory', (req,res,next) => {
    const name = req.body.name
    categoryTable.createCategory(name)
    .then(result => {
        res.status(200).send()
    })
    .catch(e => {
        res.status(500).send()
    }) 

})

route.post('/createArticle', (req,res,next) => {
    const content = req.body.content
    console.log(content)

})

module.exports = route