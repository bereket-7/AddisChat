const express = require('express')
const app = express()
const pool = require('./db/db')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// Set up routes
app.get('/', (req, res) => {
    res.render('layout', { content: 'Content for the Home page' })
})

app.get('/profile', (req, res) => {
    res.render('profile', { content: 'Content for the Profile page' })
})

app.get('/settings', (req, res) => {
    res.render('settings', { content: 'Content for the Settings page' })
})

app.get('/logout', (req, res) => {
    res.render('logout', { content: 'Content for the Logout page' })
})

// Set up Socket.io event handlers
io.on('connection', (socket) => {
    console.log('A user connected')
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

// Checking the database connection
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
