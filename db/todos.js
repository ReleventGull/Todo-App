const client = require('./index')


const createTodo = async ({name, description, due_date, userId}) => {
    try {
        const {rows: [todo]} = await client.query(`
        INSERT INTO todos (name, description, due_date, "userId")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [name, description, due_date, userId])
        return todo
    }catch(error) {
        console.log("There was an error creating the todo")
        console.log(error)
        throw error
    }
}
const getTodoById = async ({id}) => {
    try {
    const {rows: todos} = await client.query(`
    SELECT todos.*, users.username AS "creatorName", notes.id AS note_id, notes.description AS notedesc
    FROM todos
    JOIN users ON todos."userId"=users.id
    LEFT JOIN notes ON todos.id=notes."todoId"
    WHERE todos.id=$1;
    `, [id])
    console.log(todos)
    let newTodo = {}
    newTodo['notes'] =[]
    newTodo['creatorName'] = todos[0].creatorName
    newTodo['id'] = todos[0].id
    newTodo['name'] = todos[0].name
    newTodo['description'] = todos[0].description
    newTodo['due_date'] = todos[0].due_date
    newTodo['userId'] = todos[0].userId
    newTodo['isComplete'] = todos[0].isComplete
    for(let i = 0; i < todos.length; i++) {
        if(todos[i].notedesc == null) {
            continue
        }else {
            newTodo.notes.push({id:todos[i].note_id, description: todos[i].notedesc})
        }
    }
    return newTodo
    }catch(error) {
    throw error
    }
}


const getAllCompleteTodos = async() => {
    try {
        const {rows: todos} = await client.query(`
        SELECT todos.*, users.username as "creatorName"
        FROM todos
        JOIN users ON todos."userId"=users.id
        WHERE "isComplete"=true
        `)
        return todos
    }catch(error) {
     throw error
    }
    }

const getTodosByUserId = async(id) => {
    try {
    const {rows: todos} = await client.query(`
    SELECT todos.*, users.username AS "creatorName"
    FROM todos
    JOIN users ON todos."userId"=users.id
    WHERE users.id=$1
    `, [id])
    return todos
    }catch(error) {
        console.log("There was an error getting notes and todos")
        throw error
    }
}

const updateTodo = async({id, ...fields}) => {
    const keys = Object.keys(fields)
    const beforeString = keys.map((key, index) => `"${key}"=$${index+2}`)
    const setString = beforeString.join(', ')
    console.log('fields here', fields)
    try {
     const {rows: [todo]} = await client.query(`
     UPDATE todos
     SET ${setString}
     WHERE id=$1
     RETURNING *;
     `,[id, ...Object.values(fields)])
     return todo
    }catch(error) {
        console.log('There was an error updating the Todo')
        throw error
    }
}


const deleteTodo = async(id) => {
    try {
        //First delete all the notes on the todo
        const {rows: notes} = await client.query(`
        DELETE FROM notes
        WHERE "todoId"=$1
        RETURNING *;
        `, [id])
        //Then delete the todo itself
        const {rows: todos} = await client.query(`
        DELETE FROM todos
        WHERE id=$1
        RETURNING *;
        `, [id])
        return {todo: todos, notes:notes}
    }catch(error) {
        throw error
    }
}
module.exports = {
    createTodo,
    getTodosByUserId,
    updateTodo,
    getAllCompleteTodos,
    deleteTodo,
    getTodoById,
    getTodosByUserId
}