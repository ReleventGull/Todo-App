const express = require('express')
const notesRouter = express.Router({mergeParams: true})
const {getTodoById} = require('../db/todos')
const {createNote, getNoteById, deleteNote} = require('../db/notes')

const {requireUser} = require('./utils')



notesRouter.post('/', requireUser, async(req, res, next) => {
    try {
        const {todoId} = req.params
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
            res.send(createdNote)
        }
    }catch(error) {
        console.error('There was an error creating the note')
        throw error
    }
})

notesRouter.delete('/:noteId', requireUser, async(req, res, next) => {
    try {
        const {noteId, todoId} = req.params
        const noteSelected = await getNoteById(noteId)
        const checkUser = await getTodoById({id : todoId})
        if(checkUser.userId !== req.user.id) {
            res.status(401).send({
                error: "Unauthorized",
                name: "UserError",
                message: "You do not have permission to delete that note"
            })
        }else {
            const deletedNote = await deleteNote(noteId)
            res.send({
                message: "Success!",
                deletedNote
            })
        }
    }catch(error) {
        console.error("There was an error deleting the note in the api")
        throw error
    }
})

module.exports = notesRouter