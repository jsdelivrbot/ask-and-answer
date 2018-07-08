function getUsername(user_id) {
	var params = {id: user_id};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getUser", params, function(data, status){
		if (data) {
			document.getElementById("asker").innerHTML = "<a href='/profile?id='" + data.id + "'>" + data.username + "</a>";
		}
		else {
			console.log("Invalid request!");
		}
	});
}

function displayQuestion(id) {
	var params = {id: id};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getQuestion", params, function(data, status){
		if (data && data.length == 1) {
			var title = data[0].title;
			var content = data[0].content;
			var user_id = data[0].user_id;
			
			document.getElementById("title").innerHTML = title;
			document.getElementById("content").innerHTML = content;
			getUsername(user_id);
		}
		else {
			console.log("Invalid request!");
		}
	});
}