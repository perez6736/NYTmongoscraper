// dependencies ===================================================== 
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/week18Populater", {
  useMongoClient: true
});

// Routes ==========================================================

router.get("/", function(req, res){
    // need to scrape the site for articles and save them on to the db 

    res.render("index", allObj);
});

router.get("/save", function(req, res){
    // need to display the saved articles and display them for the user. 
    
    res.render("index", allObj);
});

