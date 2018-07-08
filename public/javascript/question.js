function displayQuestion(id) {
	var params = {id: id};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getQuestion", params, function(data, status){
		if (data && data.length == 1) {
			var title = data[0].title;
			var content = data[0].content;
				
			document.getElementById("title").innerHTML = title;
			document.getElementById("content").innerHTML = content;
		}
		else {
			console.log("Invalid request!");
		}
	});
}