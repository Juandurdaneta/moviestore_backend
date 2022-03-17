const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const userSchema = require('./models.js')
const User = userSchema.getUser();
const jwt = require('jsonwebtoken');
const utils = require('./utils')


// bcrypt configuration
const bcrypt = require('bcrypt');
const saltRounds = 10


// body-parser configuration
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// multer configuration
const multer = require('multer');
const upload = multer();


router.use((req, res, next)=>{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    next();
})

// Create User

router.post('/register', upload.none(), (req, res)=>{

    const { username, email, password } = req.body; 
    const newUser = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, saltRounds), // Hashing
        profileImage: utils.getProfilePicture(username)
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

router.post('/login', upload.none(), (req, res)=>{

    const {email, password} = req.body;

    User.findOne({email: email}, (err, foundUser) =>{
        if(!err) {
            if(foundUser && bcrypt.compareSync(password, foundUser.password)) {

                jwt.sign(foundUser._doc, 'secretKey', (err, token)=>{


                    if(!err){
                        res.send({
                            status: 200,
                            token: token
                        })
                    } else {
                        console.log(err)
                        res.send(err)
                    }
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

// Get user data

router.get('/', (req, res)=>{
    const user =  utils.getUser(req.headers.authorization.split(" ")[1]);

    res.send(user)
  
})

// Delete user

router.delete('/', (req, res) =>{
    const user = utils.getUser(req.headers.authorization.split(" ")[1]);

    User.findOneAndDelete({userId: user.userId}, (err, deletedUser)=>{
        if(!err){
            res.send({
                status: 200,
                message: 'User deleted succesfully'
            })
        } else {
            res.send({
                status: 400,
                message: 'An error has occurred, please try again.'
            })
        }
    })

})

// Update user

router.put('/', (req,res)=>{

})

module.exports = router;