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

               //console.log('this is the miles' + $(this).find('.last').first().text())
               let str = $(this).find('.last').first().text()  
               let arr = str.split(' ')
        
               inventory.push(
                   {
                       make: this.attribs['data-make'],
                       model: this.attribs['data-model'],
                       year: this.attribs['data-year'],
                       type: this.attribs['data-type'],
                       vin: this.attribs['data-vin'],
                       mileage: arr[2],
                       bodystyle: this.attribs['data-bodystyle'],
                       exteriorcolor: this.attribs['data-exteriorcolor'],
                       price: $(this).find('.internetPrice').text(),
                       msrp: $(this).find('.msrp').text(),
                       hwyMPG: arr[5],
                       cityMpg: arr[8]

                   }
               )

               
                //arr.push($(this).text())


            })
        })
        .then( function(inve){
            //console.log(inve)
            console.log(inventory)
        })
        .catch(function(err){
            console.log(err)
        })

  
})

app.listen('8081')

console.log('magic happenes on port 8081');

exports = module.exports = app; 