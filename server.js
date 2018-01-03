// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");

// server setup ==============================================================
var app = express();

// Serve static content 
app.use(express.static("public"));

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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