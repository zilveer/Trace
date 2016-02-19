/*jslint node: true*/
'use strict';

var Gun = require('gun/gun');
var Canvas = require('./canvas');
var local = require('./local');
var sort = require('./sort');
var find = require('./find');
var players = local.players.list;


// green, blue, red, yellow
var colors = [
	'#18c956',
	'#0075c4',
	'#ff6044',
	'#f2cc6d'
];

var options = {
	width: 5,
	background: '#202428'
};

var canvas = new Canvas({
	width: 700,
	height: 700
});

// self invoke and begin the render loop
(function render() {
	// start fresh
	canvas.clear(options.background);

	// for each player...
	Gun.obj.map(players, function (player, index) {
		// get their lines
		var lines = sort(player);
		if (lines.length) {

			// add the player's current location
			lines.push(find(player));

			// draw each turn on the canvas
			canvas.width(options.width);
			lines.forEach(canvas.line);
			canvas.stroke(colors[index - 1]);
		}
	});

	return window.requestAnimationFrame(render);
}());
