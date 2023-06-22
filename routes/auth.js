const router = require('express').Router();
const User = require('../models/User')

router.post('/register', async (req, res) => {
    const newUser = User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router