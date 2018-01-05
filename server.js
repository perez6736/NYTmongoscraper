// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");

// server setup ==============================================================


var app = express();

// Require all models
//var db = require("./models");

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


// Set Handlebars ================================================================
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ================================================================================
// ROUTER

var routes = require("./controllers/NYTscraper_controller.js");

// =============================================================================
// LISTENER
app.use("/", routes);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});