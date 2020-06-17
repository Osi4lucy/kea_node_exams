const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model

const User = require('../models/User');

// router.use(express.static('/'))
// router.use(express.static(__dirname + '/'));

// login
router.get('/login', (req, res) => {
    return res.render('login');
});

// register page

router.get('/register', (req, res) => {
  return res.render('register');
});

// Register handle
router.post('/register', (req,res)=>{
  const {name, email, password, password2} = req.body;
  let errors = [];

  // check required fields
  if(!name || !email || !password || !password2) {
      errors.push({msg: 'Please fill all fields..'});
  }

  // Validate password
  if(password != password2){
    errors.push({msg: 'Passwords do not match'});
  }

  // Check the password length
  if(password.length < 6) {
    errors.push({msg: 'Password must be at least 6 characters'});
  }

  if(errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
    } else {
      // 
      User.findOne({email: email})
      .then(user =>{
        if(user) {
          // User exists
          errors.push({msg: 'Email already exists'});
           res.render('register', {
             errors,
             name,
             email,
             password,
             password2
           });
        } else {
            const newUser = new User ({
              name: name, 
              email: email,
              password:password
            });
            // Hash password
            bcrypt.genSalt(10, (err, salt)=> 
              bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err;
                // set password to hash
                newUser.password = hash;
                // Save user
                newUser.save()
                .then(user =>{
                  req.flash('success_msg', 'Congratulations, you are now registered and can log in' );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));

            }))
        }
      });

    }
});

//Login handle
router.post('/login', (req,res, next)=>{
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect:'/login',
    failureFlash: true
  })(req, res, next);
});

// Logout handle 
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg', 'You are now logged out');
  res.redirect('/users/login');
});

// //Chats Board
// router.get('/articles', (req, res) => {
//   return res.render('index', {text: 'Welcome to articles'});
// });
// router.get('/chat', (req, res) => {
//   return res.sendFile(__dirname + "/public/index.html");
// });

module.exports = router;