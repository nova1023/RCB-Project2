//load in the models
const DB = require("../models");

//functions
function EnoughInInvetory(reqBody, findingDifference)
{
	//this function serves two separate purposes
		//determine if user has enough inventory to make sale
		//find difference between inventory quantity and quantity listed

	//check item type being sold
	switch(reqBody.itemName)
	{
		case "fashion":
			if (findingDifference)
				return (parseInt(reqBody.numFashion) - parseInt(reqBody.quantity)); //int
			else
				return (parseInt(reqBody.numFashion) >= parseInt(reqBody.quantity)); //boolean
			break;
		case "electronics":
			if (findingDifference)
				return (parseInt(reqBody.numElectronics) - parseInt(reqBody.quantity));
			else
				return (parseInt(reqBody.numElectronics) >= parseInt(reqBody.quantity));
			break;
		case "collectables":
			if (findingDifference)
				return (parseInt(reqBody.numCollectables) - parseInt(reqBody.quantity));
			else
				return (parseInt(reqBody.numCollectables) >= parseInt(reqBody.quantity));
			break;
		default:
			//shouldn't be able to enter default case
			return false;
			break;
	}
}

//Routes
module.exports = function(app)
{
	app.post("/api/new-listing", function(req, res)
	{
		//if user has enough of inventory to make that sale
		if (EnoughInInvetory(req.body, false))
		{
			if (req.body.price > 0)
			{
				//make listing in itemsForSale table
				DB.itemsForSale.create(
				{
					item_name: req.body.itemName,
					quantity: parseInt(req.body.quantity),
					starting_price: parseInt(req.body.price),
					createdAt: new Date(),
					allUserId: parseInt(req.cookies.id),
					was_listed: true

				}).then(function(newListing)
				{
					console.log("---------- new listing created -------------");

					//update quantity remaining in usersInventory
					DB.usersInventory.update(
					{
						quantity: EnoughInInvetory(req.body, true)
					}, 
					{
						where: 
						{
							allUserId: parseInt(req.cookies.id),
							item_name: req.body.itemName
						}
					}).then(function(updatedItem)
					{
						console.log("---------- user inventory item updated ----------");
						console.log(updatedItem);
						//redirect to user homepage via front end functions
						res.send(
						{
							success: true,
							redirectTo: "/user-homepage"
						});
					});
				});	
			}
			else //price < 1
				res.json({error: "Starting price must be greater than 0"});
		}
		else //not enough in inventory
			res.json({error: "Not enough in stock"});
	});
}













