// *********************************************************************************
// user-inventory-api-routes.js - this file offers a set of routes for displaying and saving data to the db
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
	//Get all 'usersInventory' joined with 'allUsers'
	app.get("/api/inventory", function(req, res)
	{
		DB.usersInventory.findAll({include: [DB.allUsers]})
		.then(function(data)
		{
			res.json(data);
		});		
	});

	//------------------------------------------------------
	//Get only one 'usersInventory'
	app.get("/api/inventory/:id", function(req, res)
	{
		DB.usersInventory.findAll({where:{allUserId: req.params.id}})
		.then(function(data)
		{
			//to store dataValues objects
			var userInventoryInfo = [];

			//pull dataValues from array of returned objects
			for (var index = 0; index < data.length; index++)
				userInventoryInfo.push(data[index].dataValues);

			res.json(userInventoryInfo);
		});		
	});

	//------------------------------------------------------
	//Get only one 'usersInventory'
	app.get("/api/inventory/sold/:id", function(req, res)
	{
		DB.usersInventory.findAll({where:{allUserId: req.params.id, sold: true}})
		.then(function(data)
		{
			//to store dataValues objects
			var userInventoryInfo = [];

			//pull dataValues from array of returned objects
			for (var index = 0; index < data.length; index++)
				userInventoryInfo.push(data[index].dataValues);

			res.json(userInventoryInfo);
		});		
	});


	//------------------------------------------------------
	//Insert/create row
	app.post("/api/inventory", function(req, res)
	{
		DB.usersInventory.create(req.body)
		.then(function(data)
		{
			res.json(data);
		});		
	});


	//------------------------------------------------------
	//updates quantity of userInventory item
	app.put("/api/inventory/quantity/:id", function(req, res)
	{
		DB.usersInventory.update(
		{
			quantity: DB.sequelize.literal('quantity + ' + req.body.quantity)
		},
		
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
	//updates userInventory item of id with whatever is in req.body.
	app.put("/api/inventory/:id", function(req, res)
	{
		DB.usersInventory.update(req.body,
		
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
	app.delete("/api/inventory/:id", function(req, res) 
	{
	    DB.usersInventory.destroy(
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
