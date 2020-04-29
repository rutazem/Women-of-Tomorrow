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





router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('private', { user: req.user });
});

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


////////////////////////// SIGN UP
///////// CREATE EPARATE ROUTES FOR METEE AND MENTOR in auth
// auth/signup_mentor
// auth/signup_mentee

//////// SHOWS YOU THE SIGN UP FORM
router.get('/signup-mentor', (req, res, next) => {
  res.render('auth/signup-mentor');
});


////OLGA, HERE'S YOUR PATH FOR THE SIGNUP
router.get('/signup-mentee', (req, res, next) => {
  res.render('auth/signup-mentee');
});



//////// SENDS USER INFO TO THE DATABASE
router.post('/signup-mentor', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render('auth/signup-mentor', { message: 'Indicate username and password' });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render('auth/signup-mentor', { message: 'The username already exists' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });

      return newUser.save();
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      res.render('auth/signup-mentor', { message: 'Something went wrong' });
    });
});



///////////////////////LOG IN 

//////// SHOWS YOU THE SIGN UP FORM
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});


router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});



/////// LOGS THE USER IN 
/////// CREATE SEPARATE LANDING PAGES after log in
// SEPARATE MENTORS AND MENTEES

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
  })
);



////////// LOG OUT
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});



module.exports = router;
