const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Group = require('../models/group')
const Chat = require('../models/chat')

// Search for users
router.get('/users', async (req, res) => {
    const query = req.query.query
    const users = await User.find({ username: { $regex: query, $options: 'i' } })
    res.json(users)
});


