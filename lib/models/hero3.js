const util = require('util');
const Character =  require('../models/character');

function Hero3(id, direction, currentRow, currentcol) {
	const steps = 1;
	
	const commands = {
		FL: [2, -1],
		FR: [2, 1],
		BL: [-2, -1],
		BR: [-2, 1],
		RF: [2, 1],
		RB: [2, -1],
		LF: [-2, 1],
		LB: [-2, -1]
	}
	//id is character id
	//direction can Upper or Lower based on Player
	//commands will be specific to given character

	Character.call(this, id, direction, steps, commands, currentRow, currentcol);

	this.moveValidator = async function(command, currentRowPos, currentColPos, grid) {
		return new Promise(async (resolve)=>{
			let playerIdOfNewPos, characterIdOfNewPos, playerIdOfOldPos, characterIdOfOldPos, newRowPos=currentRowPos, newColPos=currentColPos;
			//checking for invalid command
			if(commands[command]==undefined){
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

			if(direction==-1 && (command=='RF' || command=='LF')){
				newRowPos+=(commands[command][1]*steps*direction);
				newColPos+=(commands[command][0]*steps);	
			}
			else if(direction==1 && (command=='RF' || command=='LF')){
				newRowPos+=1;
				newColPos+=(commands[command][1]*steps*(-1));	
			}

			if(direction==-1 && (command=='RB' || command=='LB')){
				newRowPos+=(commands[command][1]*steps*direction);
				newColPos+=(commands[command][0]*steps);	
			}
			else if(direction==1 && (command=='RB' || command=='LB')){
				newRowPos+=2;
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

util.inherits(Hero3, Character);

module.exports = Hero3;