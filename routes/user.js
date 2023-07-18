const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

// UPDATE
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


// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findByIdAndDelete(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json("User Has been deleted");
    } catch(err){
        res.status(500).json(err)
    }
})

//GET USER
router.get('/find/:id', verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch(err){
        res.status(500).json(err)
    }
})

// GET ALL USERS
router.get('/users', verifyTokenAndAdmin, async(req,res)=>{
    try{
        const users = await User.find();
        // const { password, ...others } = user._doc;
        res.status(200).json(users);
    } catch(err){
        res.status(500).json(err)
    }
})


router.post('/', (req, res) => {
    const input = req.body.input;
    console.log("hey")
    res.json(input)
})

module.exports = router