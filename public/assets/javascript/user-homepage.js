// Debug Tool
console.log("user-hompage.js File Has Loaded.");

// GET Player account
//-------------------------------------------------------------------------------------
function getPlayerAccountInfo() {
	console.log("Get Player Account Info Button Pressed.");

	var userId = document.cookie.split("=")[1];

	$.get("api/user/" + userId, function(data){

		var username = data.username;
		var balance = data.balance;
		var money_spent = data.money_spent;
		var money_earned = data.money_earned;


		
		$("#playerAccountInfo").append("<li>" + username + "</li>");
		$("#playerAccountInfo").append("<li>Balance: " + balance + "</li>");
		$("#playerAccountInfo").append("<li>Money Spent: " + money_spent + "</li>");
		$("#playerAccountInfo").append("<li>Money Earned: " + money_earned + "</li>");
	});
}
//=====================================================================================


// GET player listings
//-------------------------------------------------------------------------------------
function getPlayerListings() {
	console.log("Get Player Listings Button Pressed.");

	var userId = document.cookie.split("=")[1];

	$.get("api/forsale/" + userId, function(data){
		console.log(data);

		var numberOfListings = data.length;

		for (var i = 0; i < numberOfListings; i++){
			$("#playerListings").append(
				"<div class='col-xs-12 stand-out-div-dark rounded-borders'>" +
				"<div class='col-xs-3'>" +
				"<h5>Item Name: " + data[i].item_name + "</h5>" +
				"</div>" +
				"<div class='col-xs-3'>" +
				"<h5>Highest Bid: " + data[i].highest_bid + "</h5>" +
				"</div>" +
				"<div class='col-xs-3'>" +
				"<h5>Highest Bidder: " + data[i].highest_bidder + "</h5>" +
				"</div>" +
				"<div class='col-xs-3'>" +
				"<h5>Starting Price: " + data[i].starting_price + "</h5>" +
				"</div>" +
				"</div>"
				);
		}
	});
}
//=====================================================================================


// GET players items sold
//-------------------------------------------------------------------------------------
function getPlayersItemsSold() {
	console.log("Get Players Items Sold.");

	var userId = document.cookie.split("=")[1];

	$.get("api/inventory/sold/" + userId, function(data){
		console.log(data);
		var numberOfListings = data.length;

		if (numberOfListings === 0) {
			$("#playersItemsSold").append(
				"<div class='col-xs-12 stand-out-div-dark rounded-borders'>" +
				"<div class='col-xs-3'>" +
				"<h5>No Items Sold.</h5>" +
				"</div>" +
				"</div>"
		)} else {		

		for (var i = 0; i < numberOfListings; i++){
			if (data[i].sold === true) {
				$("#playersItemsSold").append(
				"<div class='col-xs-12 stand-out-div-dark rounded-borders'>" +
				"<div class='col-xs-3'>" +
				"<h5>Item Name: " + data[i].item_name + "</h5>" +
				"</div>" +
				"<div class='col-xs-3'>" +
				"<h5>Highest Bid: " + data[i].highest_bid + "</h5>" +
				"</div>" +
				"<div class='col-xs-3'>" +
				"<h5>Highest Bidder: " + data[i].highest_bidder + "</h5>" +
				"</div>" +
				"<div class='col-xs-3'>" +
				"<h5>Starting Price: " + data[i].starting_price + "</h5>" +
				"</div>" +
				"</div>"
				);
			}
			else {
				console.log("No items sold.");
			}
		}
	}
	});
}
//=====================================================================================

getPlayerAccountInfo();
getPlayerListings();
getPlayersItemsSold();