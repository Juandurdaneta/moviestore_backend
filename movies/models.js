const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true
      },
    genre: {
        type: String,
        required: true
    },
    poster : {
        type: String
    },
    background : {
        type: String
    },
    rating : {
        type: Number,
        default: 10
    },
    trailer : {
        type: String
    }
})


movieSchema.plugin(AutoIncrement, {inc_field: 'movieId'});

exports.getMovie = function() {
    return mongoose.model("Movie", movieSchema)
}