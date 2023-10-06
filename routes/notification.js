const express = require('express')
const router = express.Router()

router.get('/notification', (req, res) => {
    res.render('notification')
})

router.get('/api/notifications', (req, res) => {

    const notifications = [
        { id: 1, content: 'Notification 1' },
        { id: 2, content: 'Notification 2' },
        { id: 3, content: 'Notification 3' },
    ]

    res.json(notifications)
})


router.post('/api/notifications/:id/mark-as-read', (req, res) => {
    const notificationId = req.params.id
    yourDatabaseLibrary.findOneAndUpdate(
        { _id: notificationId },
        { $set: { isRead: true } },
        (err, result) => {
            if (err) {
                console.error('Error marking notification as read:', err)
                return res.status(500).json({ success: false, message: 'Failed to mark as read' })
            }
            res.json({ success: true })
        }
    )
})

module.exports = router



