var cookie = document.cookie.split("=")[1];

var eventListenerCreated = false;

console.log(cookie);


function logOut() {
	$.ajax({
			method: "PUT",
			url: "/api/user/logout"
		}).done(function(res){
			if (res.success){
				window.location = res.redirectTo;
			}
		});
}

if (cookie !== undefined) {

	$("#sign-nav-link").text("Sign Out");

	eventListenerCreated = true;
	console.log("Sign out event Listener Created");

	$(document).on("click", "#sign-nav-link", logOut);
	
}