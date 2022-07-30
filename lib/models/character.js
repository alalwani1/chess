let characters = new Map();

function Character(id, direction, steps, commands, currentRow, currentcol) {
	characters.set(id, this);

	this.getId = function(){
		return id;
	}

	this.getDirection = function(){
		return direction;
	}

	this.getSteps = function(){
		return steps;
	}

	this.getCommands = function(){
		return commands;
	}

	this.getCurrentRow = function(){
		return currentRow;
	}

	this.getCurrentCol = function(){
		return currentcol;
	}

	this.setCurrentRow = function(newRow){
		return currentRow=newRow;
	}

	this.setCurrentCol = function(newCol){
		return currentcol=newCol;
	}

	this.moveValidator = async function(command, currentRowPos, currentColPos, grid) {
		return new Promise(async (resolve)=>{
			let playerIdOfNewPos, characterIdOfNewPos, playerIdOfOldPos, characterIdOfOldPos, newRowPos=currentRowPos, newColPos=currentColPos;
			//checking for invalid command
			if(commands[command]==undefined){
				resolve(false);
			}
			//direction and steps will set the new position for any player
			if(direction==-1 && (command=='L' || command=='R')){
				newColPos+=(commands[command]*steps);	
			}
			else if(direction==1 && (command=='L' || command=='R')){
				newColPos+=(commands[command]*steps*(-1));	
			}
	        if(command=='F' || command=='B'){
				newRowPos+=(commands[command]*steps*direction);	
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

Character.getCharacter = (id) => characters.get(id);

module.exports = Character;