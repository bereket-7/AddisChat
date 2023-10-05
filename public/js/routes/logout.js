const express = require('express')
const router = express.Router()

router.get('/logout', (req, res) => {
    res.render('logout')
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err)
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router
