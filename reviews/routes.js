const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const utils = require('./utils')

// Schemas
const reviewSchema = require('./models.js')
const Review = reviewSchema.getReview();

// multer configuration
const multer = require('multer');
const upload = multer();

// create review
router.post('/', (req, res)=>{

    const review = req.body

    const newReview = new Review({
        movieId: review.movieId,
        userId: review.userId,
        comment: review.comment,
        rating: review.rating
    })

    newReview.save((err)=>{
        if(!err){
            res.send({
                status: 200,
                message: "Review posted succesfully!"
            })
        } else {
            res.send({
                status: 400,
                message: "An error has ocurred while posting you review, please try again."
            })
        }
    })

})

// get reviews on movie
router.get('/:movieId', (req, res)=>{

})

// get reviews by user
router.get('/:userId', (req, res)=>{

})

// edit review
router.put('/:reviewId', (req, res)=>{

})

