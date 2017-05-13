//Dependencies
//load in the models
const DB = require("../../models");

/*  
	This is the 'Monitoring' logic for the ongoing auctions (or 'listings').
	
	Using setTimeout() monitorAI() call itself recursivly to GET all current listings and
	stores them in an array as to not have to keep querying database.
	
	Then within a setInterval timer loops through all listings checking if they expired.
	
	When expired they are check if they are sold or not.  If sold their 'sold' status is
	marked true, they are retunred to users inventory, and owners stats are updated.  
	If not sold, they are simply retured to users inventory wigh their 'sold' status as
	'false' so they could be re-listed at another time.


	*NOTE
	In order for Date() to work properly in localhost.
	You need to add "timezone": "America/New_York" parameter to 'development' in config.json
*/


//Assume 5 minute auctions.

module.exports = function monitorAI()
{	
	//all array of items for sale obects.
	var itemsForSale;
	
	//flag to check if interval is active
	var intervalFlag = false;

	DB.itemsForSale.findAll()
	.then(function(data)
	{
		itemsForSale = JSON.parse(JSON.stringify(data));  //this removes extra stuff from objects?
		
		if(itemsForSale.length > 0)
		{
			intervalFlag = true;
			
			//Runs every 1s until clearInterval is called.
			var intervalID = setInterval(function()
			{				
				for(var key in itemsForSale)
				{
					var currentItem = itemsForSale[key];

					if(isExpired(currentItem)) 
					{
						itemsForSale.splice(key,1); // this will remove item from itemsForSale.				
						returnToUsersInventory(currentItem)
					}						
				}						
			
			}, 1000);			
		}
		
		setTimeout(function()
		{
			if(intervalFlag)
				clearInterval(intervalID);
			
			monitorAI();
		
		}, 270000);// 4.5 minutes
		
	});		
};// module


//--------------------------------------
// checks if item auction's time is up. If so returns 'true', else returns 'false'
function isExpired(item)
{	
	var itemStartTime = new Date(item.createdAt);
	var currentTime = new Date();
	
	if((currentTime - itemStartTime) > 300000)   //5 minutes
	{
		return true;
	}	
	
	return false;
}

//--------------------------------------
// Adds item to 'usersInventory',
// then calls removeForSale() to remove item from 'itemsForSale'. 
function returnToUsersInventory(item)
{
	var itemId = item.id;	

	// removes 'createdAt' and 'id' property from item
	delete item.createdAt;
	delete item.id;

	item.was_listed = true;
	
	//if 'sold' property to item
	if(item.highest_bid >= item.starting_price)
		item.sold = true;

	DB.usersInventory.create(item)
	.then(function()
	{
		removeForSale(item, itemId);
	});
}

//--------------------------------------
// Deletes item with id 'forSaleId' from 'itemsForSale' table, then calls updateUserStats().
function removeForSale(item, itemId)
{

	DB.itemsForSale.destroy(
    {
     	where: 
      	{
        	id: itemId
      	}
    }).then(function()
    {
    	updateUserStats(item)
    });
}

//---------------------------------------
// Increments 'money_earned' and 'balance' of user based on 'item.allUsersId'
// in `allUsers` table.
function updateUserStats(item)
{
	var updateObj = {
		money_earned: DB.sequelize.literal('money_earned + ' + item.highest_bid),
		balance:  DB.sequelize.literal('balance + ' + item.highest_bid)
	};

	DB.allUsers.update(updateObj, {where: {id: item.allUserId}});
}

