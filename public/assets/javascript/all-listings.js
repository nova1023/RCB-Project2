// Debug Tool
console.log("all-listings.js loaded");

$.ajax({
	method: 'GET',
	url: '/api/forsale'
})
.done(function(data) {
	console.log(data);
	for (var i = 0; i < data.length; i++) {
		var highestBid;
		if (data[i].highest_bid === null){
			highestBid = 0;
		}
		$("#all-listings-table > tbody").append(
			"<tr>" +
			"<td>" + data[i].allUser.username + "</td>" +
			"<td>" + data[i].item_name + "</td>" +
			"<td>" + data[i].highest_bid + "</td>" +
			"<td>" + data[i].quantity + "</td>" +
			"</tr>");
	}
});