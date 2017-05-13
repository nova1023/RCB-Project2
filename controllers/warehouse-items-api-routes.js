// *********************************************************************************
// warehouse-items-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Dependencies
// =============================================================
// Requiring our models
const DB = require("../models");

// Routes
// =============================================================
module.exports = function(app) 
{
	// get all data from 'warehouseItems'
	app.get("/api/warehouse", function(req, res)
	{
		DB.warehouseItems.findAll()
		.then(function(data)
		{
			res.json(data);
		});		
	});

	// get one item from 'warehouseItems'
	app.get("/api/warehouse", function(req, res)
	{
		DB.warehouseItems.findOne({where: {id: req.body.id}})
		.then(function(data)
		{
			res.json(data);
		});		
	});
};


