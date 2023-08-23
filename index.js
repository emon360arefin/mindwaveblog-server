const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 4000

// middleware
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())



const blogRoute = require("./Routes/BlogRoute")
const userRoute = require("./Routes/UserRoute")
const favRoute = require('./Routes/FavRoute')



// Route
app.get('/', (req, res) => {
    res.send('Foodixir')
})

app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)
app.use('/api/favorites', favRoute)



// Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");

        // Listen to port
        app.listen(port, () => {
            console.log('Mindwaveblog is listening for requests on port', port)
        })
    })
    .catch((err) => {
        console.log(err)
    })







