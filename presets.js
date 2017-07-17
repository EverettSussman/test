

var presets = {};

// Simulation of moon orbiting earth.

presets.lunarOrbit = {
	"planets": {
		"earth": {
			"xvec": [400, 250],
			"vvec": [0, 0],
			"avec": [0, 0],
			"mass": 1e24,
			"name": "Earth"
		},
		"moon": {
			"xvec": [500, 250],
			"vvec": [0, 0],
			"avec": [0, 0],
			"mass": 1e22,
			"name": "Moon"
		}
	},
	"time": 0,
	"distance": 1000
};