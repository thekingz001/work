const express = require('express');
const router = express.Router();
const axios = require('axios').default;
var http = require('http');
const Location = require('../models/location');

router.get('/', (req, res, next) => {

    var data = {
        key: "b864325f9aa7e61adad0b649a726210a",
        flon: 100.54898,
        flat: 13.74308,
        tlon: 100.55885,
        tlat: 13.72431
    }
        
    var headers = {
        url: "https://api.longdo.com/RouteService/json/route/guide?", 
        dataType: "jsonp", 
        type: "GET", 
        contentType: "application/json", 
    }

    // axios.get('https://api.longdo.com/RouteService/json/route/guide?', {
    //     data:{
    //         key: "b864325f9aa7e61adad0b649a726210a",
    //         flon: 100.54898,
    //         flat: 13.74308,
    //         tlon: 100.55885,
    //         tlat: 13.72431
    //     }
    // })
    // .then((response) =>{
    //     console.log(response);
    // })

    // $.ajax({ 
    //     url: "https://api.longdo.com/RouteService/json/route/guide?", 
    //     dataType: "jsonp", 
    //     type: "GET", 
    //     contentType: "application/json", 
    //     data: {
    //         key: "YOUR-KEY-API",
    //         flon: 100.54898,
    //         flat: 13.74308,
    //         tlon: 100.55885,
    //         tlat: 13.72431
    // },
    // success: function (results)
    // {
    //     console.log(results);
    // },
    // error: function (response)
    // {
    //     console.log(response);
    // }
    // }); 

    // axios({
    //     method: 'get',
    //     url: 'https://api.longdo.com/RouteService/json/route/guide?',
    //     responseType: 'stream',
    //     data:{
    //         key: "b864325f9aa7e61adad0b649a726210a",
    //         flon: 100.54898,
    //         flat: 13.74308,
    //         tlon: 100.55885,
    //         tlat: 13.72431
    // }
    // }).then(function (response) {
    //     console.log(JSON.stringify(response));
    // });

    // axios.get('https://api.longdo.com/RouteService/json/route/guide?', {
    //     key: 'b864325f9aa7e61adad0b649a726210a',
    //     flon: '100.54898',
    //     flat: '13.74308',
    //     tlon: '100.55885',
    //     tlat: '13.72431'
    //   })
    // .then(response => {
    // console.log(JSON.stringify(response));
    // })
    // .catch(error => {
    //    console.log("Error = " + error);
    // });

    Location.findAll().then(projects => {
        // console.log(JSON.stringify(projects));
        const a =  Object.keys(projects);
        res.render('map',{
            data: projects
        })
    })




});

module.exports = router;