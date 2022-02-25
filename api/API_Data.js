const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {

    const dataPromise = axios.get('https://api2.binance.com/api/v3/ticker/24hr')
    .then(response => {
    //console.log(response.data);
    })
    .catch(error => {
       console.log(error);
    });

    axios.get('https://api2.binance.com/api/v3/ticker/24hr')
    .then(response => {
    //console.log(response.data);
    res.render('test', {data: response.data})
    })
    .catch(error => {
       console.log(error);
    });    
});

module.exports = router;