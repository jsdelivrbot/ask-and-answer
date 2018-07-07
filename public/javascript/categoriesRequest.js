console.log("test");
		
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
	console.log("updating results");
				
	if (data && data.length > 0) {
		var resultList = $("#ulCategories");
		resultList.empty();
		console.log("result list: " + resultList);

		for (var i = 0; i < data.length; i++) {
			console.log("appending");
			var name = data[i].name;
			resultList.append("<li><p>" + name + "</p></li>");
		}
	}
}

search();