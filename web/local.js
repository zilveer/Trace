/*jslint node: true*/
'use strict';
var Gun = require('gun/gun');

var players, gun = new Gun(location + 'gun');

require('../shared/sync');
//require('../lib/nts');

Gun.chain.stringify = function (obj) {
	return this.put(JSON.stringify(obj));
};


module.exports = {
	gun: gun,

	players: {
		db: gun.get('players').sync(players = {}),
		list: players
	},

	player: {
		db: null,
		object: null,
		index: null
	},

	justJoined: false
};
