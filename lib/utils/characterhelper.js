const Grid =  require('../models/grid');
const Pawn =  require('../models/pawn');
const Hero1 =  require('../models/hero1');
const Hero2 =  require('../models/hero2');
const Hero3 =  require('../models/hero3');


//create characters based upon their type like Pawn, Hero1, Hero2, Hero3
let	createCharacters = function(playerId, characters, direction, currentRow){
	//here col will work as column number for each player
    characters.map((characterId, currentcol) =>{
    	let index=0, characterType;
    	characterId = characterId.trim();
    	//as we are having many Pawn but with same commands but different hero with their unique commands
    	if(characterId[0]=="P"){
    		characterType = "P";
    	}
    	else{
    		characterType = characterId;
    	}
    	//create character based upon characterType
		switch(characterType) {
  			case "P":
				new Pawn(playerId+"-"+characterId, direction, currentRow, currentcol);
				break;
			case "H1":
				new Hero1(playerId+"-"+characterId, direction, currentRow, currentcol);
				break;
			case "H2":
				new Hero2(playerId+"-"+characterId, direction, currentRow, currentcol);
				break;	
			case "H3":
				new Hero3(playerId+"-"+characterId, direction, currentRow, currentcol);
				break;	
			default:
				break;
		}
	});
}

//validating all characters are valid or not
let checkAllCharactersAreValid = async function(characterIds){
	return new Promise(async (resolve)=>{
		let characterId, characterType;
	    for(let col=0;col<characterIds.length;col++){
	    	characterId = characterIds[col];
	        //as we are having many Pawn but with same commands but different hero with their unique commands
	        //if characterId is not P(starts with P), H1, H2 and H3 then character is invalid
	        characterId = characterId.trim();
	        //as we are having many Pawn but with same commands but different hero with their unique commands
	    	if(characterId[0]=="P"){
	    		characterType = "P";
	    	}
	    	else{
	    		characterType = characterId;
	    	}
	    	switch(characterType) {
  				case "P":
  				case "H1":
  				case "H2":
  				case "H3":
  					resolve(true);
  					break;
  				default:
  					resolve(false);
  					break;
  			}
	    }
	    resolve(true);
	});
}

//adding character in grid
let addCharactersInGrid = async function(playerId, characterIds, direction, gridRowNumber){
	return new Promise(async (resolve)=>{
		createCharacters(playerId, characterIds, direction, gridRowNumber);
	    characterIds = characterIds.map((character) => `${playerId}-`+character);
	    Grid.addCharacters(gridRowNumber, characterIds);
	    Grid.displayGrid();
		resolve(true);
	});
}

module.exports = {
	checkAllCharactersAreValid,
	addCharactersInGrid
};