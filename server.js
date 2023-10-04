const express = require('express')
const app = express()
const pool = require('./db')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// Set up routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// Set up Socket.io event handlers
io.on('connection', (socket) => {
    console.log('A user connected')
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

// checking the database connection
pool.query('SELECT NOW()', (err, result) => {
    if (!err) {
        console.log('PostgreSQL connected successfully.')
    } else {
        console.error('Error connecting to PostgreSQL:', err)
    }
})


// Start the server
const port = 3000
http.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
