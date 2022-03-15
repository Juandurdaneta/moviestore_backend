const express = require('express');
const router = express.Router();
const userSchema = require('./models.js')

const User = userSchema.getUser();

router.use((req, res, next)=>{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    next();
})

// Create User

router.post('/register', (req, res)=>{

    // TODO: Add hashing w bcrypt
    const { username, email, password } = req.body; 

    const newUser = new User({
        username: username,
        email: email,
        password: password
    });

    newUser.save((err)=>{
        if(err) {
            console.log(err);
            res.send({
                status: 400,
                message: "An error has occurred while creating your user. Please try again."
            });
        } else {
            res.send({
                status: 200,
                message: "User created succesfully!"
            })
        }
    });


})

// Log in user

router.post('/login', (req, res)=>{
    const {email, password} = req.body;

    User.findOne({email: email}, (err, foundUser) =>{
        if(!err) {
            if(foundUser && foundUser.password == password) {
                res.send({
                    status: 200,
                    user: foundUser
                })
            } else {
                res.send({
                    status: 400,
                    message: 'Failed to authenticate, please check your credentials and try again.'
                })
            }
        } else {
            res.send({
                status: 400,
                message: "An error has occurred, please try again."
            })
        }
    })
})