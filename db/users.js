
const client= require('./index')

const createUser = async({name, password}) => {
    try {
        const {rows:[user]} = await client.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [name, password])    
        return user
    }catch(error) {
        console.log("There was an error creating the user")
        throw error
    }
}

const getUserByUsername  = async (username) => {
    try{
    const {rows: [user]} = await client.query(`
    SELECT * FROM users
    WHERE username=$1;
    `, [username])
    return user
    }catch(error) {
        console.log("There was an error getting the user by their username")
        throw error
    }
}

const getUserById  = async (id) => {
    try{
    const {rows: [user]} = await client.query(`
    SELECT * FROM users
    WHERE id=$1;
    `, [id])
    return user
    }catch(error) {
        console.log("There was an error getting the user by their username")
        throw error
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
}