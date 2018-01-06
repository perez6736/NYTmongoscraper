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
// change this when deploying to heroku v 
mongoose.connect(process.env.MONGODB_URI);

// Routes ==========================================================

// get from database and send to user.
router.get("/", function(req, res){
    db.Article.find({}, function(){

        // dummy data 
        var dummyarticles =[{id: "1", title: "this is a title", link: "thisthelink.com"},{id: "2", title: "this is a title2", link: "thisthelink.com"},{id: "3", title: "this is a title3", link: "thisthelink.com"}]

        res.render("index");
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
          console.log(dbArticles);
          res.render("index", {articles: dbArticles});
        })
        .catch(function(err) {
          res.json(err);
        });
    });

});

// send only saved articles to handlebars
router.get("/save", function(req, res){
    //so now we need to read from the DB
    db.Article.find({issaved: true})
    .then(function(dbArticles) {
      res.render("saved", {articles: dbArticles});
    })
    .catch(function(err) {
      res.json(err);
    });
    
});

// changed the isSaved flag of the article. 
router.post("/save/:id", function(req, res){
    // get the id of the article and change the isSaved flag to true 
    db.Article.update({_id: req.params.id}, {$set: {issaved: true}}, function(msg){
        res.send("status changed.")
    })
    
});

router.post("/unsave/:id", function(req, res){
    // get the id of the article and change the isSaved flag to true 
    db.Article.update({_id: req.params.id}, {$set: {issaved: false}}, function(msg){
        res.send("status changed.")
    })
});

router.post("/notes/:id", function(req, res){
    // update the note table using the id passed in 
    console.log(req.body);

    db.Note
    .create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      console.log(dbArticle);
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

});

router.get("/notes/:id", function(req, res){
    //get the notes related to a certain article and send it to client
    db.Article
    .findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      console.log(dbArticle.note)
      res.json(dbArticle.note);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

module.exports = router;