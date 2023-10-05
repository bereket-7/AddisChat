
const express = require('express')
const router = express.Router()
const multer = require('multer')
const isAuthenticated = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})
const upload = multer({ storage })

// Profile page route
router.get('/profile', isAuthenticated, (req, res) => {
    const user = req.user
    res.render('profile', { user })
})
router.post('/profile', isAuthenticated, upload.single('profilePicture'), (req, res) => {
    const user = req.user

    if (req.file) {
        user.profilePicture = '/uploads/' + req.file.filename
    }
    user.status = req.body.status

    res.redirect('/profile')
})

module.exports = router
