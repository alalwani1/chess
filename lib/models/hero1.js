const util = require('util');
const Character =  require('../models/character');

function Hero1(id, direction, currentRow, currentcol) {
	const steps = 2;
	
	const commands = {
		L: -1,
		R: 1,
		F: 1,
		B: -1
	}
	//id is character id
	//direction can Upper or Lower based on Player
	//move can be straight or diagonal
	//commands will be specific to given character

	Character.call(this, id, direction, steps, commands, currentRow, currentcol);

};

util.inherits(Hero1, Character);

module.exports = Hero1;