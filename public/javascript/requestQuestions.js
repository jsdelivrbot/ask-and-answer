function listQuestions() {
	var params = {};

	$.get("https://polar-everglades-23609.herokuapp.com/getQuestion", params, function(data, status){
		if (data && data.length > 0) {
			var ul = $("#ulQuestions");
			ul.empty();
		
			for (var i = 0; i < data.length; i++) {
				var title = data[i].title;
				categories.append("<li>" + title + "</li>");
			}
		}
	});
}

search();