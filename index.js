// Import libraries below 
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

//Import Routes below
const userRoute = require('./routes/user')

// Configure below 
const app = express();
dotenv.config()
// JSON Body Parser- allows to take json as request body
 .use(express.json())


//Connecting to database
mongoose.connect(process.env.MONGO_URL)
    .then((res) => {
        console.log("DB Connected")
    })
    .catch((err) => { console.log(err.message) })


app.use('/api/test',(req,res)=>{
    res.json("hello")
})

app.use('/user',userRoute)

// Listening to server
app.listen(process.env.PORT|| 8001, () => {
    console.log("Server is connected")
})



