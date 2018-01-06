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
    db.Article.find({}, function(){

        // dummy data 
        var articles =[{id: "1", title: "this is a title", link: "thisthelink.com"},{id: "2", title: "this is a title2", link: "thisthelink.com"},{id: "3", title: "this is a title3", link: "thisthelink.com"}]

        // what we will put here later is to tell the user to scrpae the page using the button. 
        res.render("index");
        //{articles: [{title: "No articles. Please scrape the NYT site by pressing the scrape button."}]})
    })
});

//scrape and save to db
router.get("/scrape", function(req, res){

    request("https://www.nytimes.com", function(error, response, html){
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);

        // grab all h2 elements with the class story-heading 
        $("h2.story-heading").each(function(i, element) {
            // need to create object to put scraper stuff in 
            var results = {};

            // in each h2.collection we need the text of the link and the actual link 
            var title = $(this).children("a").text();
            var link = $(this).children("a").attr("href");
            
            results.title = title
            results.link = link

            // create a db entry for the article
            db.Article
            .create(results)
            .then(function(dbArticle) {
                res.send("Scrape Complete");
            })
            .catch(function(err) {
            });

        });
        //so now we need to read from the DB
        db.Article.find({})
        .then(function(dbArticles) {
          // If any Books are found, send them to the client
          console.log(dbArticles);
          res.render("index", {articles: dbArticles});
        })
        .catch(function(err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    });

});

// send only saved articles to handlebars
router.get("/save", function(req, res){
    //so now we need to read from the DB
    db.Article.find({issaved: true})
    .then(function(dbArticles) {
      // If any Books are found, send them to the client
      console.log(dbArticles);
      res.render("index", {articles: dbArticles});
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
    
});

// changed the isSaved flag of the article. 
router.post("/save/:id", function(req, res){
    // get the id of the article and change the isSaved flag to true 
    console.log(req.body);
    db.Article.update({_id: req.body.id}, {$set: {issaved: true}}, function(msg){
        res.send("Saved.")
    })
    
});

module.exports = router;