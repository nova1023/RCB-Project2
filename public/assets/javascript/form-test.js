// Debug Tool
console.log("form-test.js has loaded");


//******** ALL COMPLETED FUNCTIONS ARE ON BOTTOM *******************

// $(document).on("click", "button.delete", deleteTodo);

// $(document).on("click", "#", );

// For radio button:

//  var inp= $('input:radio[name=PatientPreviouslyReceivedDrug]:checked').val();
// For textbox:

//  var txt=$('input:text[name=DrugDurationLength]').val();

// On click events for all the form buttons
//-----------------------------------------------------------------------------------
$(document).on("click", "#signUpSubmit", signUp);
$(document).on("click", "#signInSubmit", signIn);
$(document).on("click", "#getPlayerAccountInfo", getPlayerAccountInfo);
$(document).on("click", "#getPlayerListings", getPlayerListings);
$(document).on("click", "#getPlayersItemsSold", getPlayersItemsSold);
$(document).on("click", "#getWarehousePrices", getWarehousePrices);
$(document).on("click", "#placeOrder", placeOrder);
$(document).on("click", "#getItemListings", getItemListings);
$(document).on("click", "#makeListing", makeListing); //makeListing
//====================================================================================


// Testing Variables
//------------------------------------------------------------------------------------
	var userAccountInfo = {
		username: "Troll",
		password: "UnderTheBridge12345",
		balance: "100",
		money_spent: "0",
		money_earned: "0"
	};
//====================================================================================



// Function to handle sign ups
//------------------------------------------------------------------------------------

function signUp() {
	console.log("Sign Up Button Pressed.");
	//grab the inputs
	var name = $("input:text[name=signUpName]").val().trim();
	var pass = $("input:password[name=signUpPassword]").val().trim();
	var passConfirm = $("input:password[name=signUpPasswordConfirm]").val().trim();

	// For testing
	//console.log(name, pass);

	// If the passwords match post to users API route
	if (pass === passConfirm){

		var userInfo = {
			signUpName: name,
			signUpPassword: pass,
			signUpPasswordConfirm: passConfirm
		}
		
		//=-=-=-=-=-=-=-=
		$.post("/api/user/signup", userInfo)
      	.then(function(data){
      		console.log("Sent user info: " + userInfo);
      		if (data.error)
      			$("input:text[name=signUpName]").val(data.error);

      		if (data.success)
      			window.location = data.redirectTo;
      		
    	});
		//=-=-=-=-=-=-=-=
	
	} else {
		$("input:text[name=signUpName]").val("");
		$("input:password[name=signUpPassword]").val("");
		$("input:password[name=signUpPasswordConfirm]").val("");
		console.log("Passwords do not match");
	}
}
//=====================================================================================



// Function to handle sign ins
//-------------------------------------------------------------------------------------

function signIn() {
	console.log("Sign In Button Pressed.");
	var name = $("input:text[name=signInName]").val().trim();
	var pass = $("input:password[name=signInPassword]").val().trim();

	var userInfo = {
		signInName: name,
		signInPassword: pass
	}

	//=-=-=-=-=-=-=-=
	$.post("/api/user/login", userInfo)
    .then(function(data){
    	console.log("Sent user info: " + userInfo);
    	if (data.error)
    		$("input:text[name=signInName]").val(data.error);

    	if (data.success)
    		window.location = data.redirectTo;
    });
	//=-=-=-=-=-=-=-=
}

//=====================================================================================



// GET Player account
//-------------------------------------------------------------------------------------

function getPlayerAccountInfo() {
	console.log("Get Player Account Info Button Pressed.");

	var id = 0;

	$.get("api/users/" + id, function(data){

		var username = data.username;
		var balance = data.balance;
		var money_spent = data.money_spent;
		var money_earned = data.money_earned;


		$("#playerAccountInfo").empty();
		$("#playerAccountInfo").append("<h4>" + username + "</h4>");
		$("#playerAccountInfo").append("<p>Balance: " + balance + "</p>");
		$("#playerAccountInfo").append("<p>Money Spent: " + money_spent + "</p>");
		$("#playerAccountInfo").append("<p>Money Earned: " + money_earned + "</p>");

	});
}

//=====================================================================================



// GET player listings
//-------------------------------------------------------------------------------------

function getPlayerListings() {
	console.log("Get Player Listings Button Pressed.");

	var id = 0;

	$("#playerListings").empty();
	$("#playerListings").append("<h4>Your Active Listings</h4>");

	$.get("api/users/" + id + "/listings", function(data){

		var numberOfListings = 5;

		for (var i = 0; i < numberOfListings; i++){
			$("#playerListings").append("<p>=-=-=-=-=-=Listing " + i + " =-=-=-=-=-=</p>");
		}
	});

}

//=====================================================================================



// GET players items sold
//-------------------------------------------------------------------------------------

function getPlayersItemsSold() {
	console.log("Get Players Items Sold.");

	var id = 0;

	$("#playersItemsSold").empty();
	$("#playersItemsSold").append("<h4>Your Inactive Listings</h4>");

	$.get("api/users/" + id + "/listings", function(data){

		var numberOfListings = 5;

		for (var i = 0; i < numberOfListings; i++){
			$("#playersItemsSold").append("<p>=-=-=-=-=-=Listing " + i + " =-=-=-=-=-=</p>");
		}
	});
}

//=====================================================================================


//=====================================================================================



// GET all item listings
//-------------------------------------------------------------------------------------

function getItemListings() {
	console.log("Get Item Listings Button Pressed.");
}

//=====================================================================================



// POST make listing
//-------------------------------------------------------------------------------------

function makeListing() {
	console.log("Make Listing Button Pressed.");

	//numberOfWhateverUnits variables initialized in 'make-a-listing-page.js'
	post = {
		numFashion: numberOfFashionUnits,
		numElectronics: numberOfElectronicsUnits,
		numCollectables: numberOfCollectablesUnits,
		quantity: 1, //default for now. Possibly based on user input down the road. 
		itemName: selectedItemType,
		price: price
	}

	$.ajax({
      method: "POST",
      url: "/api/new-listing",
      data: post
    })
    .done(function(data) {
    	if (data.success)
    		window.location = data.redirectTo;
    });
};

//=====================================================================================




// POST warehouse order
//-------------------------------------------------------------------------------------

function placeOrder() {
	console.log("Place Order Button Pressed.");
		
	var warehouseID;

	if (selectedWarehouse === "electronics") {
		warehouseID = 1;

	} else if (selectedWarehouse === "fashion"){
		warehouseID = 2;


	} else if (selectedWarehouse === "collectables"){
		warehouseID = 3;

	} else {
		console.log("Error in place order warehouse ID if statement.");
	};

	var userID = document.cookie.split("=")[1];

	console.log(numberOfUnits, warehouseID, selectedWarehouse, userID, total);
	updateWarehouseItem(numberOfUnits, warehouseID, selectedWarehouse, userID, total);
}


// GET warehouse prices
//-------------------------------------------------------------------------------------

function getWarehousePrices() {
	console.log("Get Warehouse Prices Button Pressed.");

	//=-=-=-=-=-=-=
	$.get("api/warehouse", function(data){


		$("#warehousePrices").empty();
		$("#warehousePrices").append("<h4>Warehouse Prices</h4>");
		$("#warehousePrices").append("<p>Fashion--Price Per Unit: " + data.fashion + "</p>");
		$("#warehousePrices").append("<p>Electronics--Price Per Unit: " + data.electronics + "</p>");
		$("#warehousePrices").append("<p>Collectables--Price Per Unit: " + data.collectables + "</p>");

	});
	//=-=-=-=-=-=-=
}


//======================================================================================
//============================ Completed API Functions Below ===========================
//================ I used to test api. May need to modify to fit your purpose ==========
//======================================================================================
//======================================================================================

	//===================================================================
	//=========================== ITEMS-FOR-SALE FUNCTIONS ==============
	//===================================================================

	
	// Post item to be sold
	function sellItem(itemName, startPrice, userId )
	{	
		itemName = "electronics" ;	//TEST CODE REMOVE
		startPrice = 12;			//TEST CODE REMOVE
		userId = 1;				//TEST CODE REMOVE

		// object to post (body)
		var item = {
			"item_name": itemName,
			"starting_price":  startPrice,
			"allUserId":  userId
		};
		
		$.ajax({
      	method: "POST",
      	url: "/api/forsale",
      	data: item
	    })
	    .done(function(data) {
	     	console.log(JSON.stringify(data, null, 2)); //TEST CODE

	     	//Logic using data here.
	     	
	    });
	}

	//----------------------------------------------------------------------------


	// Delete item for sale
	// Use id of item to delete as argument.
	function deleteSaleItem(itemId)
	{
		var itemId = 6;

		$.ajax({
      	method: "DELETE",
      	url: "/api/forsale/" + itemId
      	
	    })
	    .done(function(data) {
	     	console.log(JSON.stringify(data, null, 2));  //TEST CODE

	     	//Logic using data here.
	 		
	    });

	}

	//------------------------------

	// Updates highest_bidder and highest_bid of an item begin sold.
	function updateSaleItem(itemId, highestBidder, highestBid)
	{
		highestBidder = "highestBidderC";
		highestBid = 405;

		var updateData = {
			"highest_bidder": highestBidder,
			"highest_bid": highestBid
		};

		var itemId = 2;

		$.ajax({
	      	method: "PUT",
	      	url: "/api/forsale/" + itemId,
	      	data: updateData
	    })
	    .done(function(data) {
	     	console.log(JSON.stringify(data, null, 2)); //TEST CODE

	     	//Logic using data here.
	     	
	    });
	}


//===================================================================
//=========================== WAREHOUSE FUNCTIONS ===================
//===================================================================

// get warehouse items
// purchase - needs to update warehouse item - insert into usersItems table.

//-------------------------------------------------------------------------------------
// Update a given warehouseItem  `units_sold` ,

  function updateWarehouseItem(quantity, warehouseID, warehouseName, userID, total) {
   
  	
  	var post = {
  	quantity: quantity,
  	warehouseID: warehouseID,
  	warehouseName: warehouseName,
  	userID: userID,
  	total: total
  	};

    
    $.ajax({
      method: "PUT",
      url: "/api/make-purchase" ,
      data: post
    })
    .done(function(data) {
     	
     	if (data.complete === true)
    		window.location = "/user-homepage";
     
    });
  }


  //===================================================================
//=========================== USER-INVENTORY FUNCTIONS ==============
//===================================================================

	
	// Adds an item to usersInventory
	function addInventoryItem(itemName, quantity, userId )
	{	
		itemName = "ItemF" ;	//TEST CODE REMOVE
		quantity = 77;			//TEST CODE REMOVE
		userId = 3;				//TEST CODE REMOVE

		// object to post (body)
		var item = {
			"item_name": itemName,
			"quantity":  quantity,
			"allUserId":  userId
		};
		
		$.ajax({
      	method: "POST",
      	url: "/api/inventory",
      	data: item
	    })
	    .done(function(data) {
	     	console.log(JSON.stringify(data, null, 2)); //TEST CODE

	     	//Logic using data here.
	     	
	    });
	}

	//----------------------------------------------------------------------------


	// Delete item from usersInventory
	// Use id of item to delete as argument.
	function deleteInventoryItem(itemId)
	{
		itemId = 6; //TEST CODE REMOVE

		$.ajax({
      	method: "DELETE",
      	url: "/api/inventory/" + itemId
      	
	    })
	    .done(function(data) {
	     	console.log(JSON.stringify(data, null, 2));  //TEST CODE

	     	//Logic using data here.
	 		
	    });

	}

	//------------------------------

	// Updates quantity of usersInventory item.
	function updateInventoryItem(itemId, quantity)
	{
		quantity = 500;		//TEST CODE REMOVE
		itemId = 3;			//TEST CODE REMOVE
		

		var updateData = {
			"quantity": quantity
		};


		$.ajax({
	      	method: "PUT",
	      	url: "/api/inventory/" + itemId,
	      	data: updateData
	    })
	    .done(function(data) {
	     	console.log(JSON.stringify(data, null, 2)); //TEST CODE

	     	//Logic using data here.
	     	
	    });
	}
