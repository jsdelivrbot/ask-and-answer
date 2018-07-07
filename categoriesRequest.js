function search() {
	var params = {};

	$.get("https://polar-everglades-23609.herokuapp.com/getCategories", params, function(data, status){
		// For debugging purposes, make a note that we're back
		console.log("Back from server with the following results:")
		console.log(status);
    	console.log(data);

    	updateResultList(data)
	});
}

function updateResultList(data) {
	if (data.Search && data.Search.length > 0) {
		var resultList = $("#ulCategories");
		resultList.empty();

		for (var i = 0; i < data.Search.length; i++) {
			var name = data.Search[i].name;
			resultList.append("<li><p>" + name + "</p></li>");
		}
	}

}