const client = require('./index')
const {dropTables, createTables} = require('./initdb')

const rebuildDB = async() => {
await dropTables()
await createTables()
//await createInitialUsers()
// await getUser()
//await createInitialTodos()
//await createInitialNotes()
//await getTodosByUserId(2)
// await getAllTodos()
//await initalUpdatedTodos()
//await initialUpdateNotes()
// await getAllCompleteTodos()
}

client.connect()
rebuildDB().catch(console.error).finally(() => client.end())

module.exports = {
dropTables,
createTables
}