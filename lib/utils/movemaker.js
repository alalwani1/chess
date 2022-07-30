const Character =  require('../models/character');
const Grid =  require('../models/grid');
const {checkGameStatus} =  require('./gamestatus');
const { execCommand } = require('./commandlinehelper');


let makeMove = async (input , playerId, nextCommand, currentCommand) => {
        let [characterId, move] = input.split(':');        
        let character = Character.getCharacter(`${playerId}-`+characterId);
        //validating character
        if(character==undefined){
            await execCommand(currentCommand);        
            return;
        }
        //validating command for character
        if(character.getCommands()[move]==undefined){
            await execCommand(currentCommand);        
            return;
        }

        let beforeUpdateRowPos = character.getCurrentRow();
        let beforeUpdateColPos = character.getCurrentCol();
        await character.moveValidator(move, beforeUpdateRowPos, beforeUpdateColPos, Grid.getGrid()).then(async(validMove) => {
            //if current move is valid than next Player will be asked for his next move, otherwise same player will enter his new move
            if(validMove){
                Grid.updatePlayerPositionOnGrid(beforeUpdateRowPos, beforeUpdateColPos, character.getCurrentRow(), character.getCurrentCol());
                Grid.displayGrid();
                await checkGameStatus(Grid.getGrid());
                await execCommand(nextCommand);        
            }
            else {
                await execCommand(currentCommand);        
            }
        });
}

module.exports  = {
    makeMove
};