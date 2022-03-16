const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const saltRounds = 10
const router = express.Router();
const userSchema = require('./models.js')
const multer = require('multer');
const upload = multer();
const User = userSchema.getUser();


// body-parser configuration
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



router.use((req, res, next)=>{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    next();
})

// Create User

router.post('/register', (req, res)=>{

    const { username, email, password } = req.body; 

    const newUser = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, saltRounds) // Hashing 
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
            if(foundUser && bcrypt.compare(password, foundUser.password)) {
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

module.exports = router;