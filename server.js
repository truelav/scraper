var express = require('express');
var fs = require('fs');
const rp = require('request-promise');
var request = require('request');
var $ = require('cheerio');
const puppeteer = require('puppeteer');
var app = express();



app.get('/scrape', function(req, res){

    url = 'https://www.centerbmw.com/used-inventory/index.htm?start=16&'
    

    var inventory = []
    var make, model, year, price, mileage, stock, vin, bodystyle, interior, transmission, exterior, media 

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
    
           return $('[data-type="certified"]', html).each(function() {

               //console.log($(this).find('.msrp').text())

               inventory.push(
                   {
                       make: this.attribs['data-make'],
                       model: this.attribs['data-model'],
                       year: this.attribs['data-year'],
                       type: this.attribs['data-type'],
                       vin: this.attribs['data-vin'],
                       bodystyle: this.attribs['data-bodystyle'],
                       exteriorcolor: this.attribs['data-exteriorcolor'],
                       price: $(this).find('.internetPrice').text(),
                       msrp: $(this).find('.msrp').text(),
                   }
               )

               
                //arr.push($(this).text())


            })
        })
        .then( function(inve){
            console.log(inve)
            console.log(inventory)
        })
        .catch(function(err){
            console.log(err)
        })

  
        

    // var rawData = {
    //     inventory: [

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
    res.send(inventory)

})

app.listen('8081')

console.log('magic happenes on port 8081');

exports = module.exports = app; 