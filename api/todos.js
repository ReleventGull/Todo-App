const {requireUser} = require('./users')
const express = require('express')
const todoRouter = express.Router()
const {getAllTodos} = require('../db/todos')


//Gets all the todos
todoRouter.get('/', async(req, res, next) => {
    try {
        const allTodos = await getAllTodos()
        res.send(allTodos)
    }catch(error) {
        console.log("There was an error getting all the todos")
        throw error
    }
})

module.exports = todoRouter
