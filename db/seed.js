const client = require('./index')

const {dropTables, createTables} = require('./initdb')
const {createNote, updateNote} = require('./notes')
const {createTodo, getTodosByUserId, getAllTodos, getAllCompleteTodos, updateTodo, deleteTodo} = require('./todos')
const {createUser, getUserByUsername, getUserById, } = require('./users')




const createInitialUsers = async() => {
    await createUser({username:"Jaron", password: "123"})
    await createUser({username:"Bob", password: "12355"})
}

const getUser = async () => {
    await getUserByUsername('Jaron')
    await getUserById(1)
}

const createInitialTodos = async() => {
        await createTodo({
            name: "List stuff",
            description: "Have it done by that day",
            due_date: 231241242,
            userId: 1,
            isComplete: true
            })
       await createTodo({
            name: "Clean Garage",
            description: "Have garage done by tomorrow",
            due_date: 4112242,
            userId: 2,
            isComplete: true
            })
        await createTodo({
            name: "Have dinner with mom",
            description: "Have dinner with mom tomorrow at noon",
            due_date: 413212242,
            userId: 2,
            isComplete: false
           })
}
const createInitialNotes = async () => {
   await createNote({
    description: "Started on the 2nd",
    todoId: 1
    })
    await createNote({
    description: "Garage exploded",
    todoId: 2
    })
    await createNote({
       description: "Garage fixed",
       todoId: 2
        })
}


const initalUpdatedTodos = async() => {
const updateObject1 = {
    id: 1,
    name: 'Bruh',
}
await updateTodo(updateObject1)
}

const initialUpdateNotes = async() => {
await updateNote({id: 1, description: 'shithead'})
}







const rebuildDB = async() => {
client.connect()
await dropTables()
await createTables()
await createInitialUsers()
// await getUser()
await createInitialTodos()
await createInitialNotes()
await getTodosByUserId(2)
// await getAllTodos()
await initalUpdatedTodos()
await initialUpdateNotes()

// await getAllCompleteTodos()
await deleteTodo(2)

}


rebuildDB()




module.exports = {
dropTables,
createTables
}