const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require ('path');
const methodOveride = require('method-override');


// init server
const app = express();


// Passport config

require('./config/passport')(passport);

// DB config

const db = require('./config/credentials').MongoURI;

// Connect to mongo

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static
app.use( express.static(__dirname + "/"));

// BodyParser
app.use(express.urlencoded({extended:false}));
app.use(methodOveride('_method'))

// Express session middlewarer

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware

app.use(passport.initialize());
app.use(passport.session());

// Middleware for connect flash
app.use(flash());

// Global variables

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash("error");

    next();
});

// Routes
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const articleRoute = require('./routes/articles');
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/articles', articleRoute);

// Port and server

const PORT = process.env.PORT || 3050;

app.listen(PORT,(err)=>{
    if(err) {
        console.log('An error has occurred..');
    } else {
        console.log('Server running at port :', PORT);
    }
});