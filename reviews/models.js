const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reviewSchema = new mongoose.Schema({
    movieId : {
        type: Number,
        required: true
    },
    userId : {
        type: Number,
        required: true
    },
    comment : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        required: true
    },
    upvotes : {
        type: Number,
        default: 0
    }
})

reviewSchema.plugin(AutoIncrement, {inc_field: 'reviewId'});

exports.getReview = function() {
    return mongoose.model("Review", reviewSchema)
}
