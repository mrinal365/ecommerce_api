const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = require('express').Router();

// UPDATE
// console.log("ghgjkj")
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }
    try {
        console.log("req", req.params.id)
        console.log("req", req.body)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        // console.log("vgjhgv", updatedUser)
        res.status(200).json(updatedUser)
    } catch (err) {
        // console.log("gfh",err.message)
        res.status(500).json(err)
    }
});

router.post('/', (req, res) => {
    const input = req.body.input;
    console.log("hey")
    res.json(input)
})

module.exports = router