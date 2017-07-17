// Define animation functions

function titleFadeIn() {
	$('#Main-title').fadeIn(2500);
};

function subTitleFadeIn() {
	$('#Sub-title').fadeIn(2500);
};

function navFadeIn() {
	$('.nav-button').fadeIn(3500);
}

// Control functions

function updateTextInput(val) {
  var value1 = document.getElementById("range").value;
  document.getElementById('timeSlideLabel').innerHTML = 
  		"Time Speed Multiplier Order of Magnitude: " + value1;
}

function addBody() {
	// Add row to table
    var table = document.getElementById("objectTable");
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = $("#name-input").val()

    var cell2 = row.insertCell(1);
    cell2.innerHTML = $("#mass-input").val()

    var cell3 = row.insertCell(2);
    cell3.innerHTML = $("#x-input").val()

    var cell4 = row.insertCell(3);
    cell4.innerHTML = $("#y-input").val()

    var cell5 = row.insertCell(4);
    cell5.innerHTML = $("#vx-input").val()

    var cell6 = row.insertCell(5);
    cell6.innerHTML = $("#vy-input").val()

    var cell7 = row.insertCell(6);
    cell7.innerHTML = $("#ax-input").val()

    var cell8 = row.insertCell(7);
    cell8.innerHTML = $("#ay-input").val()
}


$(document).ready(function() {
	$('#Main-title').hide();
	$('#Sub-title').hide();
	$('.nav-button').hide();

	// Title and navbar fades in
	setTimeout(titleFadeIn, 1500);
	setTimeout(subTitleFadeIn, 2500);
	setTimeout(navFadeIn, 4000);

});