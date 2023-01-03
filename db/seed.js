const client = require('./index')

const {createNote, updateNote} = require('./notes')
const {createTodo, getTodosByUserId, getAllTodos, getAllCompleteTodos, updateTodo} = require('./todos')
const {createUser, getUserByUsername, getUserById, } = require('./users')


const dropTables = async () => {
    try {
        console.log("Starting drop tables...")
        await client.query(`
        DROP TABLE IF EXISTS notes;
        DROP TABLE IF EXISTS todos;
        DROP TABLE IF EXISTS users;
        `)
        console.log("Finished dropping tables")
    }catch(error) {
        console.log("There was an error dropping the tables")
        console.log(error)
        throw error
    }
}

const createTables = async() => {
    try{
        console.log("Creating tables...")
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR NOT NULL
        );
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            due_date INTEGER NOT NULL,
            "userId" INTEGER references users(id),
            "isComplete" BOOLEAN default false
        );
        CREATE TABLE notes (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            "todoId" INTEGER REFERENCES todos(id)
        );
        `)
       
        console.log("Complete create tables")
    }catch(error) {
        console.log("There was an error building tables")
        throw error
    }
}

const createInitialUsers = async() => {
    await createUser({name:"Jaron", password: "123"})
    await createUser({name:"Bob", password: "12355"})
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
await getUser()
await createInitialTodos()
await createInitialNotes()
await getTodosByUserId(2)
await getAllTodos()
await initalUpdatedTodos()
await initialUpdateNotes()
await getAllTodos()
await getAllCompleteTodos()
}


rebuildDB()