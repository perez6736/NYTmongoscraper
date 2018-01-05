// dependencies ===================================================== 
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
// Require all models
var db = require("../models");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/NYTscraper");

// Routes ==========================================================

router.get("/", function(req, res){

    request("https://www.nytimes.com", function(error, response, html){
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);

        // need to create object to put scraper stuff in 
        var results = [];

        // grab all h2 elements with the class story-heading 
        $("h2.story-heading").each(function(i, element) {
          // in each h2.collection we need the text of the link and the actual link 
          var title = $(element).children("a").text();
          var link = $(element).children("a").attr("href");
          
          //if the there is no link or title lets not add it to the array. 
          if(title !='' || link != undefined){
            results.push({
                title: title.trim(),
                link: link
              });
          }
        });

        console.log(results);

        // Create a new Article using the `result` object built from scraping
        // need to pass in an object to create - maybe for loop through all the articles? 
        for(i=0; i<results.length; i++){
            db.Article
            .create(results[i])
            .then(function(dbArticle) {
                // If we were able to successfully scrape and save an Article, send a message to the client
                res.send("Scrape Complete");
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
        }

    });

});

router.get("/save", function(req, res){
    // need to display the saved articles and display them for the user. 
    
    
});

router.post("/save/:id", function(req, res){
    // get the id of the article and change the isSaved flag to true 
    
    
});

module.exports = router;