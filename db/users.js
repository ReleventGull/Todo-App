
const client= require('./index')



const createUser = async({username, password}) => {
    try {
       console.log("I got here but I shouldn't have")
        const {rows:[user]} = await client.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password])    
        delete user.password
        return user
    }catch(error) {
        console.log("There was an error creating the user")
        throw error
    }
}

const getUserByUsername  = async (username) => {
    try{
        console.log("I got here!!!!!!!!!!!!!!!!!!!!")
    const {rows: [user]} = await client.query(`
    SELECT * FROM users
    WHERE username=$1;
    `, [username])
    if(!user) {
        return false
    }
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

const getUser = async({username, password}) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE username=$1
        `, [username])
        if(!user) {
            return false
        }
        if(user.password !== password) {
            return false
        }
        delete user.password
        
        return user
    }catch(error) {
        console.log("There was an error getting the user")
        throw error
    }
}
module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    getUser
}