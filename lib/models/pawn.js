const util = require('util');
const Character =  require('../models/character');

function Pawn(id, direction, currentRow, currentcol) {
	const steps = 1;
	
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

util.inherits(Pawn, Character);

module.exports = Pawn;