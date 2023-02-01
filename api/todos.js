const {requireUser} = require('./utils')
const express = require('express')
const todoRouter = express.Router()
const {createTodo, getTodoById, updateTodo, deleteTodo, getTodosByUserId} = require('../db/todos')


//Gets all the todos

todoRouter.get('/', requireUser, async (req, res, next) => {
    try {
        const userTodos = await getTodosByUserId(req.user.id)
        for(let i = 0; i < userTodos.length; i++) {
          userTodos[i]['status'] = ''
          if (userTodos[i].isComplete) {
            userTodos[i].status = 'complete'
          } else if (new Date(userTodos[i].due_date) - new Date() <= 0) {
            userTodos[i].status = 'overdue'
          }else {
            userTodos[i].status = 'incomplete'
          }
        }
        res.send(userTodos)
    }catch(error) {
        console.error("There was an error getting all of the todos", error)
        throw error
    }
})
todoRouter.get('/:todoId', async(req, res, next) => {
    try {
    const {todoId} = req.params
    const todo = await getTodoById({id: todoId})
   
        todo['status'] = ''
        if (todo.isComplete) {
          todo.status = 'complete'
        } else if (new Date(todo.due_date) - new Date() <= 0) {
          todo.status = 'overdue'
        }else {
          todo.status = 'incomplete'
        }
    let dateString = ''
    for(let i = 0; i < todo.due_date.length; i++) {
        if (todo.due_date[i] !== ',') {
            dateString += todo.due_date[i]
        }
    }
    todo['dateString'] = dateString
    res.send(todo)
    }catch(error) {
        throw error
    }
})

todoRouter.post('/', requireUser,  async(req, res, next) => {
    try {
    let updateFields = {}
    
    const {name, description, date} = req.body
    const dateArray = date.split('-')
    const dates = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const due_date = `${dates[dateArray[1]-1]} ${dateArray[2]}, ${dateArray[0]}`
    
    updateFields.name = name
    updateFields.description= description
    updateFields.due_date = due_date
    updateFields.userId = req.user.id
    const toDo=await createTodo(updateFields)
    res.send(toDo)
    }catch(error) {
        console.error("There was an error getting all the todos")
        throw error
    }
})

todoRouter.patch('/:toDoId', requireUser, async(req, res, next) => {
    try {
        const {toDoId} = req.params
        const foundTodo = await getTodoById({id:toDoId})
        if(foundTodo.userId != req.user.id) {
            res.status(402).send({
                error: "AccessDenied",
                name: "ValidationError",
                message: "You do not have permission to edit this todo!"
            })
        }else {
            const {description, isComplete, due_date, name} = req.body
            let updateObject = {}
            updateObject['id'] = toDoId
            updateObject['isComplete'] = isComplete
            name ? updateObject['name'] = name : null
            
            if(due_date) {
            const dateArray = due_date.split('-')
            const dates = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const newDate = `${dates[dateArray[1]-1]} ${dateArray[2]}, ${dateArray[0]}`
            updateObject['due_date'] = newDate
            }
            description ? updateObject['description'] = description: null
            const updatedTodo = await updateTodo(updateObject)
            res.send(updatedTodo)
        }
        
    }catch(error) {
    }
})

todoRouter.delete('/:toDoId', requireUser, async(req, res, next) => {
    try{
        const{toDoId} = req.params
        const foundTodo = await getTodoById({id: toDoId})
        if(foundTodo.userId !== req.user.id) {
            res.status(402).send({
                error: "AccessDenied",
                name: "ValidationError",
                message: "You do not have permission to delete this todo!"
            })
        }else {
            const deletedTodo = await deleteTodo(toDoId)
            res.send(deletedTodo)
        }
    }catch(error) {
        console.error(error)
        throw error
    }
})
const notesRouter = require('./notes')

todoRouter.use('/:todoId/notes', notesRouter);


module.exports = todoRouter
