require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const server = express()
const client = require('./db/index')

client.connect()
server.use(morgan('dev'))
server.use(express.json())
server.use(cors())

const PORT = 4500
server.listen(PORT, () => console.log("I'm listening on PORT:", PORT))



server.use('/healthy', (req, res, next) => {
    res.send("I'm healthy")
})





const router = require('./api/index')
server.use('/api', router)












server.use((error, req, res, next) => {
    res.send({
        error: error.message,
        name: error.name,
        message: error.message
    })
})