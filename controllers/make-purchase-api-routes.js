// *********************************************************************************
// make-purchase-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
//
// Route to make a purchase from the warehouse.
// 'units_sold' of item is incremented by 'quantity' of users purchase in `warehouseItems` table.
// Then addToUserInventory() is used to add item with given parameters to `usersInventory`.
// Finally updateUserStats() decrements the user 'balance' and increments the users 'money_spent'
// in `allUsers` table.
// If all are successful a json object of {complete: true} will be responded.
// If any step is unseccessful then a json object of {complete: false} will be responded.


// Dependencies
// =============================================================
// Requiring our models
const DB = require("../models");

// Routes
// =============================================================
module.exports = function(app) 
{			
	// Route to make a purchase from the warehouse.
	// Checks if user has sufficient funds before purchase.
	// 'units_sold' of item is incremented by quantity of users purchase in warehouseItems table.
	// Then addToUserInventory() is called
	app.put("/api/make-purchase", function(req, res)
	{								
		DB.allUsers.findOne({where: {id: req.body.userID}})
		.then(function(data)
		{
		
			if(data.balance >= req.body.total)
			{	
				//Updates 'units_sold' of item.
				DB.warehouseItems.update(
				{ 			
					 units_sold: DB.sequelize.literal('units_sold + ' + req.body.quantity)				
				},
				
				{
					where: 
					{
						id: req.body.warehouseID
					}
				})
				.then(function(data)
				{			
					//if update successful
					if(data[0] === 1)
					{
						addToUserInventory(req.body.userID, req.body.quantity, req.body.warehouseName, req.body.total, res);
					}
					else
					{
						res.json({complete: false, error: "update failed"});
					}	
					
				}).catch(function(error){
					
					res.json({complete: false, error: "update error"});
				});		
			}
			else
			{
				res.json({complete: false, error: "Insufficient Balance"})
			}
		});	
  	});
};

//Helper Functions
//=================================================================

// Adds item with given parameters to `usersInventory`.
function addToUserInventory(userId, quantity, itemName, totalSpent, res)
{
	var item ={	 
		
		quantity: quantity,
		item_name: itemName,
		allUserId: userId
	};
		
	DB.usersInventory.create(item)
	.then(function(data)
	{
		updateUserStats(userId, totalSpent, res)	
	
	}).catch(function (err) {
  		res.json({complete: false});
	});;			
}

//---------------------------------------
//Decrements the user 'balance' and increments the users 'money_spent'
// in `allUsers` table.
function updateUserStats(userId, totalSpent, res )
{
	var updateObj = {
		balance: DB.sequelize.literal('balance - ' + totalSpent),
		money_spent: DB.sequelize.literal('money_spent + ' + totalSpent)
	};

	DB.allUsers.update(updateObj, {where: {id: userId}})
	.then(function(data)
	{
		if(data[0] === 1)
		{
			res.json({complete: true});
		}
		else
		{
			res.json({complete: false});
		}	
	}).catch(function (err) {
  		
  		res.json({complete: false});
	});	
}

