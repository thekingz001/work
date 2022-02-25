const express = require('express');
const router = express.Router();
const Provinces = require('../models/thai_provinces');
const Geographies = require('../models/thai_geographies');

router.get('/', (req, res, next) => {
    Provinces.findAll().then(projects => {
        console.log(projects);
        res.render('joint', {data: projects});
      })
});
module.exports = router;