//dependencies ===========================================================
const DB = require("../../models");

/*
In order for a botBid to be made, 3 decisions must be made.

    1. Select an item from itemsForSale (check if there are any)
        - query database for totalNum itemsForSale
        - randomly pick and item from there
    2. Decide if want to buy item
        - based on preference variables * RNG
    3. Decide how much to spend (if want to buy item)
        - based on preference variables * RNG
    
- If decide to buy item === true
    - make bid for whateverAmountDecided

-----------------------------------------------------------
Initialization info
- bidChance is the likelihood of the bot making a bid. Ex:
	bidChance of 10 has a 1/10 chance of bidding
- bidRange will be turned into multiplier on the current 
price of the item. Ex:
	bidRange of 28 may max out at a 1.27 multiplier of the current price
*/

//constructor =============================================================
function BidderBot(nameInput, bidChance, bidRange)
{
	//Instance Variables ---------------------------------------------

	//private
	var name = nameInput
		, chance = bidChance //number < 100 && number > 0
		, range = bidRange; //number < 100 && number > 0

	//Get/Set Properties ---------------------------------------------

	//public 
	this.GetName = function()
	{
		return name;
	};

	//Methods --------------------------------------------------------

	//private
	var GetRandomItemIndex = function(numItems)
	{
		return Math.floor((Math.random() * numItems));
	};

	//private
	var DecideIfBuying = function(itemObject)
	{
		//include itemObject data in calculations further down the road

		var lottoNumber = Math.floor(Math.random() * 100);
		return (lottoNumber < chance);
	};

	//private
	var DecideBidAmount = function(itemObject)
	{
		var multiplier = Math.round(Math.random() * range) / 100 + 1;
		multiplier = parseFloat(multiplier.toFixed(2));

		//somebody has bid on the item
		if (itemObject.highest_bid !== null && itemObject.highest_bid !== 0)
		{
			console.log("going off highest bid");

			var bid = Math.ceil(multiplier * itemObject.highest_bid);

			if (bid === itemObject.highest_bid)
				return bid + 1;
			else
				return bid;
		}
		else	//nobody has bid on the item yet
		{
			console.log("going off starting price");

			var bid = Math.ceil(multiplier * itemObject.starting_price);

			if (bid === itemObject.starting_price)
				return bid + 1;
			else
				return bid;
		}
	};

	//private
	var MakeBid = function(bidAmount, itemObject)
	{
		//make bid on selected item
		DB.itemsForSale.update(
		{
			highest_bid: bidAmount,
			highest_bidder: name
		},
		{
			where: 
			{
				id: itemObject.id
			}
		}).then(function(updatedItem)
		{
			console.log("------------ " + name + " bid: " + bidAmount + " ---------------");
			console.log("on:\n" + 
			"id: " + itemObject.id + "\n" +
			"startingPrice: " + itemObject.starting_price + "\n" +
			"prevHighestPrice: " + itemObject.highest_bid + "\n" +
			"prevHighestBidder: " + itemObject.highest_bidder + "\n" +
			"allUserId: " + itemObject.allUserId);
		});
	};

	//private
	var SelectItem = function()
	{
		//query itemsForSale
		DB.itemsForSale.findAll({}).then(function(saleItemsRaw)
		{
			if (saleItemsRaw.length > 0) //there are itemsForSale
			{
				var saleItems = [];

				//pull dataValues objects from saleItemsRaw
				for (var index = 0; index < saleItemsRaw.length; index++)
					saleItems.push(saleItemsRaw[index].dataValues);

				//Randomly pick one of the items
				var chosenIndex = GetRandomItemIndex(saleItems.length);

				//Decide if want to buy that item
				var isBuying = DecideIfBuying(saleItems[chosenIndex]);

				if (isBuying)
				{
					var bidAmount = DecideBidAmount(saleItems[chosenIndex]);

					MakeBid(bidAmount, saleItems[chosenIndex]);
				}
				else
				{
					console.log("------------------------------------------------");
					console.log(name + " is not buying the item at index: " + chosenIndex);
				}
			}
			else
				console.log("no items for sale");
		});
	};

	//private
	var ConvertToMilliseconds = function(number, timeUnit)
	{
		switch(timeUnit)
		{
			case 'd': //days
				return ConvertToMilliseconds(number * 24, 'h');
				break;
			case 'h': //hours
				return ConvertToMilliseconds(number * 60, 'm');
				break;
			case 'm': //minutes
				return ConvertToMilliseconds(number * 60, 's');
				break;
			case 's': //seconds
				return number * 1000;
				break;
			default:
				console.log("invalid units");
				break;
		}
	};

	//public
	this.StartBiddingCycle = function(number, timeUnit)
	{
		var delay = ConvertToMilliseconds(number, timeUnit);

		if (typeof delay === "number" && delay > 0)
			var bidId = setInterval(SelectItem, delay);
		else
			console.log("delay invalid");
	};
}

//exporting the constructor ===============================================
module.exports = BidderBot;

//testing =================================================================









