const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load Conn Database model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
const tb_product_type = require('../models/tb_product_type');

// Login Page GET
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page GET
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register Page POST
router.post('/register', (req, res) => {
  const { name, username, password, password2 } = req.body;
  const errors = [];

  if (!name || !username || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      username,
      password
    });
  } else {
    User.findAll({ where: { user: username } })
      .then(user => {
        if (user == username) {
          errors.push({ msg: 'Username already exists' });
          res.render('register', {
            errors,
            name,
            user,
            password
          });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              User.create({
                user: username,
                name: name,
                pass: hash
              }).then(user => {
                console.log(user)
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
                .catch(err => console.log(err));
            });
          });
        }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
