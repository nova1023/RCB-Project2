// ****************************************************************************
// RCB 	'Battle Bay'  		May 02,2017
// Server.js - This is the initial starting point for the Node/Express server.
// ============================================================================

// Dependencies
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const METHOD_OVERIDE = require('method-override');  
const COOKIE_PARSER = require("cookie-parser");
// const EXPHBS = require("express-handlebars");

// Sets up the Express App
const PORT = process.env.PORT || 3000;
const APP = EXPRESS();

// Requiring our models for syncing
const DB = require("./models");

//Static directory
APP.use(EXPRESS.static(process.cwd() + "/public"));

// Sets up the Express app to handle data parsing
APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.text());
APP.use(BODY_PARSER.json({ type: "application/vnd.api+json" }));

//Set up cookie parser
APP.use(COOKIE_PARSER());

// Override with POST having ?_method=...
APP.use(METHOD_OVERIDE("_method"));

//Require AI contructors
const BidderBot = require("./controllers/ai/bidder-bot.js");

//Require Monitor AI
const MONITOR = require("./controllers/ai/monitor-auctions.js")

//Construct AI objects
var saul = new BidderBot("Saul", 40, 5);
var jesse = new BidderBot("Jesse", 36, 8);
var walter = new BidderBot("Walter", 28, 20);
var skyler = new BidderBot("Skyler", 30, 14);
var hank = new BidderBot("Hank", 10, 75);

// Set Handlebars.
// APP.engine("handlebars", EXPHBS({ defaultLayout: "main" }));
// APP.set("view engine", "handlebars");

// Routes =============================================================
require("./controllers/html-routes.js")(APP);
require("./controllers/items-for-sale-api-routes.js")(APP);
require("./controllers/all-users-api-routes.js")(APP);
require("./controllers/user-inventory-api-routes.js")(APP);
require("./controllers/warehouse-items-api-routes.js")(APP);
require("./controllers/make-a-listing-routes.js")(APP);
require("./controllers/make-purchase-api-routes.js")(APP);


DB.sequelize.sync().then(function()  //**** REMOVE {force:true} *** . USE ONLY FOR TESTING.
{
	APP.listen(PORT, function()
	{
		console.log("Listening on port: " + PORT);

		//Start AI bidding cycle
		//Fast bidding for Demo
		saul.StartBiddingCycle(3, 's');
		jesse.StartBiddingCycle(7, 's');
		walter.StartBiddingCycle(12, 's');
		skyler.StartBiddingCycle(8, 's');
		hank.StartBiddingCycle(20, 's');

		//Starts auction monitoring
		MONITOR();
	});
});

