const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const server = express()
const app = express.Router()
const client = require('./db/index')

client.connect()
server.use(morgan('dev'))
server.use(express.json())
server.use(cors())

const PORT = 4500
server.listen(PORT, () => console.log("I'm listening on PORT:", PORT))



server.use('/healthy', (req, res, send) => {
    res.send("I'm healthy")
})