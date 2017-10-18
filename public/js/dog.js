$(document).ready(function() { 


// Give treat button
// Updates the treats column in the database
$(".treat-btn").on("click", function() {
	var id = $(this).data("treatid");
		// console.log("id ", id);
	var currentTreats = $(this).data("treats");
		// console.log("currentTreats ", currentTreats);
	var addedTreats = (currentTreats + 1);
		// console.log("addedTreats ", addedTreats);

	var updatedTreats = {
		treats: addedTreats
		};

		$.ajax("/api/dogs/" + id, {
			type: "PUT",
			data: updatedTreats
		}).then(function() {
			console.log("updated id ", id);
			location.reload();
		});
	});


$("#filter-dogs").hide();
$(".show-all-btn").hide();

$(".filter-btn").on("click", function() {
	$("#filter-dogs").toggle();
	$(".show-all-btn").toggle();
});

// Filter-breed logic
function url() { 
	var urlLoc = window.location.pathname;
	urlLoc = urlLoc.replace(window.location.hostname, "");

	urlLoc = urlLoc.replace("/finddog/", "");

	var checkedArray = urlLoc.split("+");

	$.each($("form[name=filter-dogs] input:checkbox"), function () {
		console.log( checkedArray.indexOf(this.value) );
 		if ( checkedArray.indexOf(this.value) >= 0 ) {
 			$(':checkbox[value=' + this.value + ']').attr('checked', true);
 		}
 		$("#filter-dogs").show();
		$(".show-all-btn").show();
	});
	}
	url();

	$(".dog-filter-btn").on("click", function() {

	var allCheckedDogs = [];
	var formData = $("#filter-dogs").serializeArray();
	console.log(formData);

	for (var i = 0; i < formData.length; i++) {
		allCheckedDogs.push(formData[i].value);
	}

	var allDogs = {
		breed: allCheckedDogs
	}

	  var stringBreed = allCheckedDogs.join("+");
		window.location = "/finddog/" + stringBreed;

});


	$(".show-all-btn").on("click", function() {
 			$(':checkbox').attr('checked', false);
			var allCheckedDogs = [];

			var allDogs = {
				breed: allCheckedDogs
			}
			var stringBreed = allCheckedDogs.join("+");
			window.location = "/finddog/" + stringBreed;

	});


});  // End document.ready(function())




