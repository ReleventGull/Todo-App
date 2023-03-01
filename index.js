require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const server = express()
const client = require('./db/index')
const path = require('path')


client.connect()
server.use(morgan('dev'))
server.use(express.json())
server.use(cors())
const router = require('./api/index')

const {PORT = 4500} = process.env
server.listen(PORT, () => console.log("I'm listening on PORT:", PORT))

server.use('/healthy', (req, res, next) => {
    res.send("I'm healthy")
})
server.use('/api', router)

server.use(express.static(path.join(__dirname, 'build')))
server.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


server.use((error, req, res, next) => {
    res.send({
        error: error.message,
        name: error.name,
        message: error.message
    })
})