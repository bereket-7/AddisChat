
const express = require('express')
const router = express.Router()

router.get('/settings', (req, res) => {
    const userSettings = {
        username: 'bereket_7',
        email: 'bereket@gmail.com',
    }

    res.render('settings', { userSettings })
})
router.post('/settings', (req, res) => {

    const updatedSettings = {
        username: req.body.username,
        email: req.body.email,
    }
    res.redirect('/settings')
})

module.exports = router
