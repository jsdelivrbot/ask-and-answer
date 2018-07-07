function search() {
	var params = {};

	$.get("https://polar-everglades-23609.herokuapp.com/getCategories", params, function(data, status){
		updateResultList(data)
	});
}

function updateResultList(data) {			
	if (data && data.length > 0) {
		var resultList = $("#ulCategories");
		resultList.empty();

		for (var i = 0; i < data.length; i++) {
			var name = data[i].name;
			resultList.append("<li><p>" + name + "</p></li>");
		}
	}
}

search();