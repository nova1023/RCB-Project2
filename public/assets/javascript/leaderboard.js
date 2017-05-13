// Debug Tool
console.log("leaderboard.js File Has Loaded.")


// GET all the players ordered by money earned and display them
//---------------------------------------------------------------------------------------------------
$.ajax({
	method: 'GET',
	url: '/api/leaderboard'
})
.done(function(data) {
	console.log(data);
	for (var i = 0; i < data.length; i++) {

		switch (i)
			{
				case 0: 
					var newRankDiv = $("<div>");
					var rankElement = $("<p>");
					var rankImage = "<img src='assets/images/1st-place-logo.png' id='first-place-trophy'/>";
					var rankItem = newRankDiv.append(rankElement);
					rankElement.addClass("first-place text-center");
					rankElement.html(" " + "Rank: " +  data[0].rank +
						" " + "Player: " + data[0].player + 
						" " + "Profit: " + data[0].profit);
					rankElement.prepend(rankImage);
					newRankDiv.append("<hr>");
					break;
				case 1:
					var newRankDiv = $("<div>"); 
					var rankElement = $("<p>");
					var rankImage = "<img src='assets/images/2nd-place-logo.png' id='second-place-trophy'/>";
					var rankItem = newRankDiv.append(rankElement);
					rankElement.addClass("second-place text-center");
					rankElement.html(" " + "Rank: " +  data[1].rank +
						" " + "Player: " + data[1].player + 
						" " + "Profit: " + data[1].profit);
					rankElement.prepend(rankImage);
					newRankDiv.append("<hr id='second-place-line'>");
					break;
				case 2:
					var newRankDiv = $("<div>");
					var rankElement = $("<p>");
					var rankImage = "<img src='assets/images/3rd-place-logo.png' id='third-place-trophy'/>";
					var rankItem = newRankDiv.append(rankElement);
					rankElement.addClass("third-place text-center");
					rankElement.html(" " + "Rank: " +  data[2].rank +
						" " + "Player: " + data[2].player + 
						" " + "Profit: " + data[2].profit);
					rankElement.prepend(rankImage);
					newRankDiv.append("<hr id='third-place-line'>");
					break;
				default:
					var newRankDiv = $("<div>");
					var rankElement = $("<p>");
					var rankItem = newRankDiv.append(rankElement);
					rankElement.addClass("text-center leaderboard-losers");
					rankElement.html("Rank: " +  data[i].rank +
						" " + "Player: " + data[i].player + 
						" " + "Profit: " + data[i].profit);
					break;
			}	
		$(".rank-list").append(rankItem);
	}
});
//===================================================================================================