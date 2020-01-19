const express = require('express')
const route = express.Router()
const categoryTable = require('../api/categoryDatabase')


route.get('/getAll',(req,res,next) => {
    categoryTable.getAllCategories()
    .then(result => {
        res.status(200).send({
            categories: result
        })
    })
    .catch(e => {
        res.status(500).send()
    })
})

module.exports = route