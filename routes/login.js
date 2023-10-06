const express = require('express')
const router = express.Router()

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
]

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    const { username, password } = req.body
    const user = users.find((u) => u.username === username)

    if (!user) {
        return res.render('login', { error: 'Invalid username or password' })
    }

    if (user.password !== password) {
        return res.render('login', { error: 'Invalid username or password' })
    }
    req.session.user = user
    res.redirect('/')
})
module.exports = router