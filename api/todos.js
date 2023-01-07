const {requireUser} = require('./utils')
const express = require('express')
const todoRouter = express.Router()
const {getAllTodos, createTodo, getTodoById, updateTodo} = require('../db/todos')


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

todoRouter.post('/', requireUser,  async(req, res, next) => {
    try {
    let updateFields = {}
    const {name, description, due_date} = req.body
    updateFields.name = name
    updateFields.description= description
    updateFields.due_date = due_date
    updateFields.userId = req.user.id
    const toDo=await createTodo(updateFields)
    res.send(toDo)
    }catch(error) {
        console.log("There was an error getting all the todos")
        throw error
    }
})

todoRouter.patch('/:toDoId', requireUser, async(req, res, next) => {
    try {
        const {toDoId} = req.params
        const foundTodo = await getTodoById({id:toDoId})
        if(foundTodo.userId != req.user.id) {
            next({
                error: "AccessDenied",
                name: "ValidationError",
                message: "You do not have permission to edit this todo!"
            })
        }else {
            req.body.id = toDoId
            const updatedTodo = await updateTodo(req.body)
            res.send(updatedTodo)
        }
        
    }catch(error) {

    }
})

module.exports = todoRouter
