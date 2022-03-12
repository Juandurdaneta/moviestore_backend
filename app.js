const express = require('express');
const mongoose = require('mongoose');
const port = 4000
const app = express();
const movieRoutes = require('./movies/routes')

// body-parser configuration
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// bd
mongoose.connect("mongodb://localhost:27017/moviestore", { useUnifiedTopology: true, useNewUrlParser: true });

app.use('/movies', movieRoutes);


app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})