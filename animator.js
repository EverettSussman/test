"use strict";

// Helper Functions
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var animator = null;
var rest = 60;
var time = 0;
var scale = 1e8;

// var simPreset = presets.lunarOrbit;
// console.log(simPreset.planets.moon);

// var test = new Body([200,200], [0,0], [0,0], 1e33, "sun");
// var test2 = new Body([220, 220], [1, -1], [0, 0], 1e24, "earth");
// //var test3 = new Body([210, 400], [0, 1], [0, 0], 1e20, "doom");


$(document).ready(function() {

	// Create canvas
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	// Store celestial bodies
	var bodies = []

	// Random bodies

	for (var i = 0; i < 50; i++) {
		var xcoord = getRandomArbitrary(50, 650);
		var ycoord = getRandomArbitrary(50, 450);

		var xvel = getRandomArbitrary(-.01, .01);
		var yvel = getRandomArbitrary(-.01, .01);

		var rpow = getRandomArbitrary(30, 36);

		bodies.push(new Body([xcoord, ycoord], [xvel, yvel], [0,0], Math.pow(10, rpow), "star" + i, time, scale));
	}

	// Earth and Moon 
	// scale = 10e3;
	// bodies.push(new Body([400, 250], [0,0], [0,0], 5.974*Math.pow(10, 24), "Earth", time, scale));
	// bodies.push(new Body([438.44, 250], [0, 90], [0,0], 7.347*Math.pow(10, 22), "Moon", time, scale));

	// Display physics info in bottom left corner of ctx
	function drawPhysText() {
		// Display Time factor
		ctx.fillText("Time factor: 1s = 10e" + time + "s.", 600, 460);
		// Display Scale
		ctx.fillText("Scale: ", 600, 490);
		ctx.fillText((scale*100).toExponential() + " km", 670, 480);

		ctx.beginPath();
		ctx.moveTo(650, 490);
		ctx.lineTo(750, 490);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(650, 485);
		ctx.lineTo(650, 495);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(750, 485);
		ctx.lineTo(750, 495);
		ctx.stroke();
	};

	// Fill canvas
	function draw() {
		ctx.fillStyle = "#000000";
		ctx.font = "18px Bellefair";
		var pointSize = 3;

		// Clear canvas
		ctx.clearRect(0, 0, c.width, c.height);

		// Determine time warp
		$("#range").on("change", function () {
			bodies.forEach(function(body) {
				// revert to initial time
				time = $("#range").val();
				body.time = Math.pow(10, time);
				
			});
		});

		// Draw physics labels
		drawPhysText();

		// Delete bodies that are absorbed
		bodies = bodies.filter(function(body) {
			return body.delete !== true;
		});

		// Reset information

		// Find min/max radii of bodies
		var maxRadius = Number.NEGATIVE_INFINITY;
		var minRadius = Number.POSITIVE_INFINITY;

		bodies.forEach(function(body) {
			if (body.radius < minRadius) {
				minRadius = body.radius;
			};
			if (body.radius > maxRadius) {
				maxRadius = body.radius;
			};
		});

		bodies.forEach(function(body) {

			// Reset accelerations
			body.ax = 0;
			body.ay = 0;

			// Scale radii
			var radiusTemp = 0;
			radiusTemp = Math.log10(body.radius / minRadius) + 2;

			ctx.beginPath();
			ctx.arc(body.x, body.y, radiusTemp, 0, Math.PI*2);
			ctx.fill();
		});

		bodies.forEach(function(body) {
			bodies.forEach(function(body2) {
				if (body2.name != body.name) {
					body.applyForces(body2);
				};
			});
		});

		bodies.forEach(function(body) {
			body.deltaV(body.ax*body.time, body.ay*body.time);
			body.deltaX(body.vx*body.time, body.vy*body.time);
		});

		//bodies[1].prettyPrint;
	};

	// Control buttons

	$("#start").click(function () {
		console.log("Clicked!");

		if (animator == null) {
			animator = window.setInterval(draw, rest);
		};	
	});

	$("#end").click(function () {
		console.log("Clicked!");

		bodies.forEach(function(body) {
			body.revert;
		});

		clearInterval(animator);
		animator = null;
		ctx.clearRect(0,0, c.width, c.height);
		
	});

	$('#pause').click(function () {
		console.log("Pause clicked!");
		clearInterval(animator);
		animator = null;
	});

	$('#resume').click(function () {
		console.log("Resume clicked!");

		if (animator == null) {
			animator = window.setInterval(draw, rest);
		};
	});



});


