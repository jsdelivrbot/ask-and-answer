function getUsername(user_id) {
	var params = {id: user_id};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getUser", params, function(data, status){
		if (data) {
			var date = $("#dateAsker");
			date.append(" by <a href='/profile?id=" + data.id + "'>" + data.username + "</a>");
			//document.getElementById("asker").innerHTML = "By <a href='/profile?id=" + data.id + "'>" + data.username + "</a>";
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
			var date = new Date(data[0].date);
			var content = data[0].content;
			var user_id = data[0].user_id;
			
			var dateString = date.toLocaleDateString("en-US");
			
			document.getElementById("title").innerHTML = title;
			document.getElementById("dateAsker").innerHTML = "Asked on " + dateString;
			document.getElementById("content").innerHTML = content;
			getUsername(user_id);
		}
		else {
			console.log("Invalid request!");
		}
	});
}

function displayAnswers(questionID) {
	var params = {questionID: questionID};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getAnswer", params, function(data, status){
		if (data) {
			var div = $("#answers");
			div.empty();
			
			for (var i = 0; i < data.length; i++) {
				var content = data[i].content;
				var user_id = data[i].user_id;
				var username = data[i].username;
				
				div.append("<div><a href='/profile?id=" + user_id + "'>" + username + "</a><p>" + content + "</p></div>");
				/*
				var params = {id: user_id};
	
				$.get("https://polar-everglades-23609.herokuapp.com/getUser", params, function(data2, status2){
					if (data2) {
						console.log("content now:" + content);
						var username = data2.username;
						div.append("<div><a href='/profile?id=" + user_id + "'>" + username + "</a><p>" + content + "</p></div>");
						//div.append("<a href='/profile?id=" + data.id + "'>" + data.username + "</a>");
					}
					else {
						console.log("Invalid request!");
					}
				});
				*/
			}
		}
		else {
			console.log("Invalid request!");
		}
	});
}