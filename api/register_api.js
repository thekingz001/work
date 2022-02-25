const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// GET ROUTE
router.get('/true', (req, res, next) => {
  res.send({ x: 'register' });
});
// GET ROUTE
router.get('/fale', (req, res, next) => {
  res.send({ x: 'not register' });
});

// POST ROUTE
router.post('/', (req, res, next) => {
  console.log(JSON.stringify(
    {
      username: req.body.username,
      name: req.body.name,
      password: req.body.password
    })
  );

  var username = req.body.username,
    password = req.body.password,
    name = req.body.name
    ;
  
  User.findAll({ where: { user: username } })
    .then(user => {
      if (user == username) {
        res.redirect('register/fale');
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            User.create({
              user: username,
              name: name,
              pass: hash
            }).then(user => {
              res.redirect('register/true');
            })
              .catch(err => console.log(err));
          });
        });
      }
    });

});

module.exports = router;