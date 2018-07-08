function loadProfile(id) {
	var params = {id: id};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getUser", params, function(data, status){
		if (data) {
			document.getElementById("image").innerHTML = "<img src='" + data.picture_url + "'></img>";
			document.getElementById("username").innerHTML = "<h3>" + data.username + "</h3>";
			document.getElementById("description").innerHTML = "<p>" + data.description + "</p>";
		}
		else {
			console.log("Invalid request!");
		}
	});
}