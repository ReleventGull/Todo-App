const client = require('./index')

const createNote = async ({description, todoId}) => {
    try {
        const {rows: [note]} = await client.query(`
        INSERT INTO notes (description, "todoId")
        VALUES ($1, $2)
        RETURNING *
        `, [description, todoId])
        return note
    }catch(error) {
        console.log("There was an error creating the note")
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
console.log('Updated note', note)
return note
}catch(error) {
throw error
}
}
module.exports = {
    createNote,
    updateNote
}