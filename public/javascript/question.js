function getUsername(user_id) {
	console.log("user id in request is: " + user_id);
	var params = {id: user_id};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getUser", params, function(data, status){
		if (data) {
			return data[0].username;
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
			console.log("function user_id is: " + user_id);
			
			document.getElementById("title").innerHTML = title;
			document.getElementById("content").innerHTML = content;
			document.getElementById("asker").innerHTML = getUsername(user_id);
		}
		else {
			console.log("Invalid request!");
		}
	});
}