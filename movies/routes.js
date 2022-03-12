const express = require('express');
const router = express.Router();
const movieSchema = require('./models.js')

const Movie = movieSchema.getMovie();


// POST METHOND

router.post('/', (req, res)=>{

    const newMovie = new Movie(
        req.body
    )

    newMovie.save((err) =>{
        if(err){
            console.log('Error al crear la pelicula')
            console.log(err)
            res.send({
                status: 100,
                mensaje: "There was an error adding the movie to the database, try again.",
              });
        } else{
            console.log('Movie successfully added')
            res.send({ Status: 200, mensaje: "Movie added to the database Successfully!." });
        }
    })

})

// GET ALL MOVIES

router.get('/', (req, res)=>{

    Movie.find({}, (err, moviesFound) =>{ 
        if(!err){
            res.send({ 
                status: 200, 
                foundMovies: moviesFound
            });
        } else {
            res.send({
                status: 500,
                message: "An error has occurred. Please try again."
            })
        }
        
     })

     
})

// GET SPECIFIC MOVIE

router.get('/:movieId', (req, res)=>{

    const movieId = req.params.movieId

    Movie.find({movieId: movieId}, (err, movieFound)=>{
        if(!err && movieFound[0]){
            res.send({ 
                status: 200, 
                foundMovie: movieFound[0]
            });
        } else if(!movieFound[0]){
            res.send({
                status: 400,
                message: `No movie has been found with the id ${movieId}`
            })
        } else if(err){
            res.send(err)
        }
    })

})

// EDIT A MOVIE

router.put('/:movieId', (req, res)=>{

    Movie.findOneAndUpdate({movieId: req.params.movieId}, req.body, (err, movieFound)=>{
        if(!err && movieFound){
            res.send({ 
                status: 200, 
                mensaje: 'Movie Updated succesfully'
            }); 
        } else{
            res.send({
                status: 500,
                mensaje: 'An error has occurred. Please try again.'
            })
        }
    })

})

// DELETE MOVIE

app.delete('/:movieId', (req,res)=>{

    try{
        Movie.findOneAndDelete({movieId: req.params.movieId}, (err, movieDeleted)=>{
            if(!err){
                res.send({ 
                    status: 200, 
                    mensaje: 'Movie deleted succesfully'
                });
            } else {
                res.send({ 
                    status: 500, 
                    mensaje: "An error has occurred. Please try again."
                });
            }
        });
       
    } catch(err){
        res.send(err);
    }
    
});


module.exports = router;