var express = require('express');
var fs = require('fs');
const rp = require('request-promise');
var request = require('request');
var $ = require('cheerio');
var app = express();


const options = {
    uri: 'https://www.'
}


app.get('/scrape', function(req, res){
    
    //all web scraping magic will happene here

    url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'

    //the structure of our request call
    //the first parameter is our URL
    // the callback function takes 3 parameters, error, response status and html code


    rp(url)
        .then(  function(html){
            const wikiUrls = [];
            for (let i = 0; i < 45; i++){
                wikiUrls.push($('big > a', html)[i].attribs.href);
            }
            console.log(wikiUrls)
        })
        .catch( function(err){
            //handle err
            console.log(err)
        })

    // request(url, function(error, response, html){

    //     //first we check to make sure no errors

    //     if(!error){
    //         //next well utilize the ceerios library on the return html


    //         //finally well define the variables were gonna capture

    //         var inventory, release, rating
    //         var make, model, year, price, mileage, stock, vin, bodystyle, interior, transmission, exterior, media

            // var rawData = {
            //     inventory: [
            //         {
            //             make: '',
            //             model: '',
            //             year: '',
            //             price: '',
            //             mileage: '',
            //             stock: '',
            //             vin: '',
            //             bodystyle: '',
            //             interior: '',
            //             transmission: '',
            //             exterior: '',
            //             media: ''
            //         }
            //     ]
            // }

            // var json = {
                
            //     bmw: {

            //         '1-series': {

            //         },
            //         '2-series': {

            //         },
            //         '3-series': {

            //         },
            //         '4-series': {

            //         },
            //         '5-series': {

            //         },
            //         '6-series': {

            //         },
            //         '7-series': {

            //         },
            //         '8-series': {

            //         },
            //         'x-series': {

            //         },
            //         'z-series': {

            //         },
                    
            //     },

            // }
            
            
        // }

    // })

})

app.listen('8081')

console.log('magic happenes on port 8081');

exports = module.exports = app; 