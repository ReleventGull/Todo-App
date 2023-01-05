const client = require('../../db/index')


 const createFakeUser = async({username, password}) => {
    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO USERS (username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password])
        return user
    }catch(error) {
        console.log(error)
        throw error
    }
 }

module.exports = {
    createFakeUser
}