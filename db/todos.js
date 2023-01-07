const client = require('./index')


const createTodo = async ({name, description, due_date, userId}) => {
    try {
        console.log("Starting to create todo")
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
        console.log(id)
    const {rows: [todo]} = await client.query(`
    SELECT * FROM todos
    WHERE id=$1;
    `, [id])
    return todo
    }catch(error) {
    throw error
    }
}
const getAllTodos = async() => {
    try {
        const {rows: todos} = await client.query(`
            SELECT todos.*, users.username AS "creatorName", notes.id AS note_id, notes.description AS notedesc
            FROM todos
            JOIN users ON todos."userId"=users.id
            LEFT JOIN notes ON todos.id=notes."todoId"
        `, )
        console.log(todos)
        let duptodos = []
        for(let i = 0; i < todos.length; i ++) { 
           let existingToDo = duptodos.find(todo => todo.id == todos[i].id)
           if (!existingToDo) {
            console.log(existingToDo, i)
            let newTodoObject = {}
            newTodoObject.id = todos[i].id
            newTodoObject.name = todos[i].name
            newTodoObject.description = todos[i].description
            newTodoObject.due_date = todos[i].due_date
            newTodoObject.userId = todos[i].userId
            newTodoObject.isComplete = todos[i].isComplete
            newTodoObject['notes'] = []
            duptodos.push(newTodoObject)
            existingToDo = newTodoObject
           }
           if(!todos[i].note_id) {
            continue
           }
           existingToDo.notes.push({id: todos[i].note_id, desc:todos[i].notedesc})
        }
        return duptodos
        }catch(error) {
            console.log("There was an error getting notes and todos")
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
            console.log(todos)
        }catch(error) {
            throw error
        }
    }


const getTodosByUserId = async(id) => {
    try {
    const {rows: todos} = await client.query(`
        SELECT todos.*, users.username AS "creatorName" 
        FROM todos
        JOIN users
        ON todos."userId"=users.id
        WHERE users.id=$1
    `, [id])
    todos.forEach(todo => todo['notes'] = [])
    const {rows: notes} = await client.query(`
    SELECT * FROM notes
    `)
    for(let i = 0; i < notes.length; i++) {
        for(let j = 0; j < todos.length;j ++) {
            if(notes[i].todoId === todos[j].id) {
                todos[j].notes.push(notes[i])
            }else {
                continue
            }
        }
    }
    return todos
    }catch(error) {
        console.log("There was an error getting notes and todos")
        throw error
    }
}

const updateTodo = async({id, ...fields}) => {
    const keys = Object.keys(fields)
    console.log(keys)
    const beforeString = keys.map((key, index) => `"${key}"=$${index+2}`)
    
    const setString = beforeString.join(', ')
    console.log(setString)
    try {
     const {rows: [todo]} = await client.query(`
     UPDATE todos
     SET ${setString}
     WHERE id=$1
     RETURNING *;
     `,[id, ...Object.values(fields)])
     console.log("Udpated todo", todo)
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
    getAllTodos,
    updateTodo,
    getAllCompleteTodos,
    deleteTodo,
    getTodoById,
    getTodosByUserId
}