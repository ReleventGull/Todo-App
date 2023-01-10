const client = require('./index')

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
            due_date VARCHAR(255) NOT NULL,
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


module.exports = {
    dropTables, 
    createTables
}