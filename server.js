var express = require('express');
var fs = require('fs');
const rp = require('request-promise');
var request = require('request');
var $ = require('cheerio');
const puppeteer = require('puppeteer');
var app = express();



app.get('/scrape', function(req, res){

    url = 'https://www.centerbmw.com/used-inventory/index.htm?start=16&'
    
    puppeteer
        .launch()
        .then (function(browser) {
            return browser.newPage();
        })
        .then( function(page) {
            return page.goto(url).then(function(){
                return page.content();
            })
        })
        .then( function(html) {
           return $('.url', html).each(function() {
                console.log($(this).text())
            })
        })
        .then( function(data){
            console.log(typeof data)
        })
        .catch(function(err){
            console.log(err)
        })

  
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

})

app.listen('8081')

console.log('magic happenes on port 8081');

exports = module.exports = app; 