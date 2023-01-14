const express = require('express')
const notesRouter = express.Router({mergeParams: true})
const {getTodoById} = require('../db/todos')
const {createNote} = require('../db/notes')
const {requireUser} = require('./utils')



notesRouter.post('/', requireUser, async(req, res, next) => {
    try {
       
        const {todoId} = req.params
        console.log('The id params', todoId)
        const {description} = req.body
        const checkTodo = await getTodoById({id: todoId})
        if(checkTodo.userId !== req.user.id) {
            res.status(401).send( {
                error: "Unahtorized",
                name: "UnauthorizaredUser",
                message: "You are not authorized to add a note to this todo"
            })
        }else {
            const createdNote = await createNote({description: description, todoId: todoId})
            console.log(createdNote)
            res.send(createdNote)
        }
    }catch(error) {
        console.error()
    }
})

module.exports = notesRouter