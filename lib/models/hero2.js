const util = require('util');
const Character =  require('../models/character');

function Hero2(id, direction, currentRow, currentcol) {
	const steps = 2;
	
	const commands = {
		FL: [1, -1],
		FR: [1, 1],
		BL: [-1, -1],
		BR: [-1, 1]
	}
	//id is character id
	//direction can Upper or Lower based on Player
	//move can be straight or diagonal
	//commands will be specific to given character

	Character.call(this, id, direction, steps, commands, currentRow, currentcol);

	this.moveValidator = async function(command, currentRowPos, currentColPos, grid) {
		return new Promise(async (resolve)=>{
			let playerIdOfNewPos, characterIdOfNewPos, playerIdOfOldPos, characterIdOfOldPos, newRowPos=currentRowPos, newColPos=currentColPos;
			//checking for invalid command
			if(commands[command]==null){
				resolve(false);
			}
			//direction and steps will set the new position for any player
			if(direction==-1 && (command=='FL' || command=='FR')){
				newRowPos+=(commands[command][0]*steps*direction);
				newColPos+=(commands[command][1]*steps);	
			}
			else if(direction==1 && (command=='FL' || command=='FR')){
				newRowPos+=2;
				newColPos+=(commands[command][1]*steps*(-1));	
			}

			if(direction==-1 && (command=='BL' || command=='BR')){
				newRowPos+=(commands[command][0]*steps*direction);
				newColPos+=(commands[command][1]*steps);	
			}
			else if(direction==1 && (command=='BL' || command=='BR')){
				newRowPos-=2;
				newColPos+=(commands[command][1]*steps*(-1));	
			}

			//validating Character going out of grid bounds
	        if(newRowPos<0 || newRowPos>=grid.length || newColPos<0 || newColPos>=grid[0].length){
	        	resolve(false);
	        }
	        [playerIdOfOldPos, characterIdOfOldPos] = grid[currentRowPos][currentColPos].split('-');
	        [playerIdOfNewPos, characterIdOfNewPos] = grid[newRowPos][newColPos].split('-');
	        
	        //validating targeting a friendly character, i.e a character from our own team
	        if(playerIdOfNewPos!=" " && playerIdOfOldPos==playerIdOfNewPos){
	        	resolve(false);
	        }
	        this.setCurrentRow(newRowPos);
	        this.setCurrentCol(newColPos);
	        resolve(true);
	    });
    }
};

util.inherits(Hero2, Character);

module.exports = Hero2;