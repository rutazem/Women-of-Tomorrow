// routes/auth-routes.js
const express = require('express');
const router = express.Router();

require('dotenv').config()


// User model
const User = require('../models/user-model');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
// const bodyParser = require('body-parser');  




/////// LINKEDIN PATH
router.get('/auth/linkedin',
    passport.authenticate('linkedin')
)

// The request will be redirected to LinkedIn for authentication, so this
// function will not be called.

// the login callback:

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

//////// SHOWS YOU THE SIGN UP FORM

router.get(`/signup-mentee`, (req, res, next) => {
    res.render(`auth/signup-mentee`)
})

//////// SENDS USER INFO TO THE DATABASE

router.post('/signup-mentee', (req, res, next) => {
    const {
        username,
        password,
        name,
        surname
    } = req.body;

    //let name = req.body.name

    // res.render(`name: ${name}`)

    console.log("hello from signup mentee")

    if (!username || !password) {
        res.render('auth/signup-mentee', {
            message: 'Indicate username and password'
        });
        return;
    }

    User.findOne({
        username
    })
        .then(user => {
            if (user !== null) {
                res.render('auth/signup-mentee', {
                    message: 'The username already exists'
                });
                return;
            }

            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);

            console.log({
                username,
                password: hashPass,
                role: 'Mentee',
                name,
                surname
            })

            const newUser = new User({
                username,
                password: hashPass,
                role: 'Mentee',
                name,
                surname
            });

            //
            newUser.save().then(() => {
                res.redirect('/');
            })
        })

    // .catch(error => {
    //     res.render('auth/signup-mentee', {
    //         message: 'Something went wrong'
    //     });
    // });
});

//----------------------Personal Information Form----------------------




///////////////////////LOG IN 

router.get('/login', (req, res, next) => {
    res.render('auth/login', {
        message: req.flash('error')
    });
});


/////// LOGS THE USER IN 
/////// CREATE SEPARATE LANDING PAGES after log in
// SEPARATE MENTORS AND MENTEES

// router.post(

//     '/login',
//     passport.authenticate('local', {
//         successRedirect: '/mentee-space',
//         failureRedirect: '/login',
//         failureFlash: true,
//         passReqToCallback: true
//     }),
// )

// router.get('/mentee-space', (req, res) => {
//     res.redirect('spaces/mentee-space')
// })

router.get('/mentee-space', ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render('spaces/mentee-space', { user: req.user });
});

////////// LOG OUT
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;