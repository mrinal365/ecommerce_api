const express = require('express');
const moongoose = require('mongoose');
const dotenv = require('dotenv')

const app = express();
dotenv.config()
app.use(express.json())

moongoose.connect(process.env.MONGO_URL)
    .then((res) => {
        console.log("DB Connected")
    })
    .catch((err) => { console.log(err.message) })

app.listen(process.env.PORT|| 8001, () => {
    console.log("Server is connected")
})


// mongodb+srv://mrinaltewary:<password>@whalehub.nhfqmla.mongodb.net/?retryWrites=true&w=majority

