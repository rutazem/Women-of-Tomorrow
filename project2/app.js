require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const flash = require('connect-flash');

// const db = require('db')
// db.connect({
//   clientID: process.env.LINKEDIN_KEY,
//   clientSecret: process.env.LINKEDIN_SECRET,
// })



// app.js
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;





const index = require('./routes/index');
const router = require('./routes/auth-mentor');

const app = express();



/////////////FLASH
app.use(flash());

////////////////// LINKED IN STRATEGY

const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({

  clientID: '86wwwbio73aivd',
  clientSecret: 'NRWpLoqmA6DV1SHp',
  //clientID: LINKEDIN_KEY,
  //clientSecret: LINKEDIN_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile',],
  state: true,
}, function (accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));



///////// MONGOOSE SET UP

mongoose
  .connect('mongodb://localhost/project2', {


    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';






///////////// PASSPORT INNIT

app.use('/', index);
// app.js

app.use(
  session({
    secret: 'our-passport-local-strategy-app',
    resave: true,
    saveUninitialized: true
  })
);


passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

passport.use(
  new LocalStrategy((username, password, callback) => {
    User.findOne({ username })
      .then(user => {
        if (!user) {
          return callback(null, false, { message: 'Incorrect username' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return callback(null, false, { message: 'Incorrect password' });
        }
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
  })
);


// app.js

app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);
app.use('/', index);



module.exports = app;
