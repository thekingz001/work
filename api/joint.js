const express = require('express');
const router = express.Router();
const Provinces = require('../models/thai_provinces');

router.get('/', (req, res, next) => {
    Provinces.findAll().then(projects => {
        //console.log(JSON.stringify(projects));
        res.render('joint', {
          title: "Joint table",
          data: projects});
    })
});
module.exports = router;