function search() {
	var params = {};

	$.get("https://polar-everglades-23609.herokuapp.com/getCategories", params, function(data, status){
		updateResultList(data)
	});
}

function updateResultList(data) {			
	if (data && data.length > 0) {
		var categories = $("#selectCategories");
		categories.empty();
		categories.append("<option value='all'>All</option>");
		
		for (var i = 0; i < data.length; i++) {
			var name = data[i].name;
			categories.append("<option value='" + name + "'>" + name + "</option>");
		}
	}
}

search();