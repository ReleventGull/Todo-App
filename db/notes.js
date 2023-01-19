const client = require('./index')

const getNoteById = async(id) => {
    try {
        const {rows: [note]} = await client.query(`
        SELECT * FROM notes
        WHERE id=$1
        `, [id])
        return note
    }catch(error) {
        console.error("There was an error getting the note by its id", error)
        throw error
    }
}
const createNote = async ({description, todoId}) => {
    try {
        const {rows: [note]} = await client.query(`
        INSERT INTO notes (description, "todoId")
        VALUES ($1, $2)
        RETURNING *
        `, [description, todoId])
        return note
    }catch(error) {
        console.error("There was an error creating the note", error)
        throw error
    }
}

const updateNote = async ({id, description}) => {
    try {
        const {rows : [note]} = await client.query(`
        UPDATE notes
        SET description=$2
        WHERE id=$1
        RETURNING *;
        `, [id, description])
        return note
    }catch(error) {
        throw error
        }
}

const deleteNote = async(id) => {
    try {
        const {rows: [note]} = await client.query(`
        DELETE from NOTES
        WHERE id=$1
        RETURNING *;
        `, [id])
        return note
    }catch(error) {
        console.error("There was an erring deleteing the note")
    }
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNoteById
}