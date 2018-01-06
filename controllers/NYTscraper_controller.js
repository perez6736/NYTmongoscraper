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

// get from database and send to user.
router.get("/", function(req, res){
    db.Article.find({}, function(dbArticles){
        console.log("grabbing from db");
        console.log(dbArticles);

        // dummy data 
        var articles =[{id: "1", title: "this is a title", link: "thisthelink.com"},{id: "2", title: "this is a title2", link: "thisthelink.com"},{id: "3", title: "this is a title3", link: "thisthelink.com"}]

        res.render("index", {articles: articles});
    })
});

//scrape and save to db
router.get("/scrape", function(req, res){

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
            })
            .catch(function(err) {
            });
        }
        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");

    });

});

// send only saved articles to handlebars
router.get("/save", function(req, res){
    // dummy data 
    var articles =[{id: "1", title: "this is a title", link: "thisthelink.com"},{id: "2", title: "this is a title2", link: "thisthelink.com"},{id: "3", title: "this is a title3", link: "thisthelink.com"}]
    
     res.render("saved", {articles: articles});
    
});

// changed the isSaved flag of the article. 
router.post("/save/:id", function(req, res){
    // get the id of the article and change the isSaved flag to true 
    
    
});

module.exports = router;