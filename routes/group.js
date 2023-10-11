
router.get('/group/members/:groupId', isAuthenticated, async (req, res) => {
    const groupId = req.params.groupId

    try {
        const group = await Group.findById(groupId)
        if (!group) {
            return res.status(404).json({ error: 'Group not found' })
        }

        const groupMembers = await User.find({ _id: { $in: group.members } })

        res.json(groupMembers)
    } catch (error) {
        console.error('Error fetching group members:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
router.post('/group/members/:groupId', isAuthenticated, async (req, res) => {
    const groupId = req.params.groupId
    const userId = req.body.userId

    try {
        const group = await Group.findById(groupId)
        if (!group) {
            return res.status(404).json({ error: 'Group not found' })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        group.members.push(user)
        await group.save()

        res.json({ success: true })
    } catch (error) {
        console.error('Error adding a member to the group:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})


router.delete('/group/members/:groupId', isAuthenticated, async (req, res) => {
    const groupId = req.params.groupId
    const userId = req.body.userId

    try {
        const group = await Group.findById(groupId)
        if (!group) {
            return res.status(404).json({ error: 'Group not found' })
        }

        group.members = group.members.filter(memberId => memberId.toString() !== userId)

        await group.save()

        res.json({ success: true })
    } catch (error) {
        console.error('Error removing a member from the group:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})
