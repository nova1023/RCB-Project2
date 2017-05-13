// *********************************************************************************
// for-sale-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// Requiring our models
const DB = require("../models");

// Routes
// =============================================================
module.exports = function(app) 
{
	
	//------------------------------------------------------
	//Get all 'itemsForSale' joined with 'allUsers'
	app.get("/api/forsale", function(req, res)
	{
		DB.itemsForSale.findAll({include: [DB.allUsers]})
		.then(function(data)
		{
			res.json(data);
		});		
	});

	//------------------------------------------------------
	//Get all 'itemsForSale' from single user with id
	app.get("/api/forsale/:id", function(req, res)
	{
		DB.itemsForSale.findAll({where: {allUserId: req.params.id}})
		.then(function(data)
		{
			res.json(data);
		});		
	});

	//------------------------------------------------------
	//Insert/create row
	app.post("/api/forsale", function(req, res)
	{
		DB.itemsForSale.create(req.body)
		.then(function(data)
		{
			res.json(data);
		});		
	});

	//------------------------------------------------------
	//update row where `id`
	app.put("/api/forsale/:id", function(req, res)
	{
		DB.itemsForSale.update(req.body,
		{
			where:
			{
				id: req.params.id
			}
		})
		.then(function(data)
		{
			res.json(data);
		});		
	});

	//------------------------------------------------------
	//Delete row where `id`
	app.delete("/api/forsale/:id", function(req, res) 
	{
	    DB.itemsForSale.destroy(
	    {
	     	where: 
	      	{
	        	id: req.params.id
	      	}
	    }).then(function(data) 
	    {
	      res.json(data);
	    });
  	});

  
};

