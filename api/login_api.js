const express = require('express');
const router = express.Router();
const passport = require('passport');
const tb_product_type = require('../models/tb_product_type');
const User = require('../models/User');

// GET ROUTE
router.get('/true', (req, res, next) => {
    res.send({
        type:'login',
        user: req.user.user,
        name: req.user.name,
    });
});
// GET ROUTE
router.get('/fale', (req, res, next) => {
    res.send({x:'not login'});
});

// POST ROUTE
router.post('/', (req, res, next) => {
    
    passport.authenticate('local', {
        successRedirect: '/login/true',
        failureRedirect: '/login/fale',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;