const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send("user route")
});
  
router.post('/',(req,res)=>{
    const input = req.body.input;
    console.log("hey")
    res.json(input)
})

module.exports= router