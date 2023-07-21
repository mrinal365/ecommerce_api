// Import libraries below 
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes below
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');

// Configure below 
const app = express();
dotenv.config()
// JSON Body Parser- allows to take json as request body
app.use(express.json())


//Connecting to database
mongoose.connect(process.env.MONGO_URL)
    .then((res) => {
        console.log("DB Connected")
    })
    .catch((err) => { console.log(err.message) })


app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)


// Listening to server
app.listen(process.env.PORT|| 8001, () => {
    console.log("Server is connected")
})



