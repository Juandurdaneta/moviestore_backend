const express = require('express');
const mongoose = require('mongoose');
const port = 4000
const app = express();
const usersRoutes = require('./users/routes')
const movieRoutes = require('./movies/routes')
const reviewsRoute = require('./reviews/routes')

const cors = require('cors')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// cors
app.use(cors())

// bd
mongoose.connect("mongodb://localhost:27017/moviestore", { useUnifiedTopology: true, useNewUrlParser: true });

// routes
app.use('/movies', movieRoutes);
app.use('/users', usersRoutes);
app.use('/reviews', reviewsRoute);


app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
});