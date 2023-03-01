const client = require('./index')
const {dropTables, createTables} = require('./initdb')

const rebuildDB = async() => {
await dropTables()
await createTables()
}

client.connect()
rebuildDB().catch(console.error).finally(() => client.end())




module.exports = {
dropTables,
createTables
}