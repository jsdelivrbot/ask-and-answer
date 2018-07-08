function listQuestions() {
	var categoryId = document.getElementById("selectCategories").value;
	var params = {categoryId: categoryId};
	
	$.get("https://polar-everglades-23609.herokuapp.com/getQuestion", params, function(data, status){
		if (data) {
			var ul = $("#ulQuestions");
			ul.empty();
		
			for (var i = 0; i < data.length; i++) {
				var title = data[i].title;
				var id = data[i].id;
				ul.append("<li><a href='/question?id=" + id + "'>" + title + "</a></li>");
			}
		}
	});
}