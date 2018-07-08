function loadProfile(id, ownProfile) {
	var params = {id: id};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getUser", params, function(data, status){
		if (data) {
			document.getElementById("image").innerHTML = "<img src='" + data.picture_url + "'></img>";
			document.getElementById("username").innerHTML = data.username;
			document.getElementById("description").innerHTML = data.description;
			
			if (ownProfile) {
				document.getElementById("edit").innerHTML = "<button action='/editProfile'>Edit Profile</button>";
			}
		}
		else {
			console.log("Invalid request!");
		}
	});
}