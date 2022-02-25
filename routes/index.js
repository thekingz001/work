const express = require('express');
const { restart } = require('nodemon');
const { JSONB } = require('sequelize');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const tb_product_type = require('../models/tb_product_type');
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  tb_product_type.findAll().then(projects => {
    res.render('dashboard', {
    user: req.user.user,
    name: req.user.name,
    data: projects
    })
  })
});

module.exports = router;
