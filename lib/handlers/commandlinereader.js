'use strict';

const Character =  require('../models/character');
const Grid =  require('../models/grid');
const Direction =  require('../models/direction');
const { addCommand, execCommand } = require('../utils/commandlinehelper');
const { promptCreation } = require('../utils/prompt');
const { makeMove } = require('../utils/movemaker');
const { addCharactersInGrid, checkAllCharactersAreValid } =  require('../utils/characterhelper');

addCommand("1", "Player1 Input: ", async () => {
    await promptCreation().then(async(input) => {
        let characterIds = input.split(',');
        await checkAllCharactersAreValid(characterIds).then(async(allCharactersAreValid) => {
            if(allCharactersAreValid){
                Grid.initializeGrid(characterIds.length);
                await addCharactersInGrid('A', characterIds, Direction.getDirection("UPPER"), Grid.getRows()-1);                 
                await execCommand('2'); 
            }
            else{
                await execCommand('1');     
            }
        });
    });
});

addCommand("2", "Player2 Input: ", async () => {
    await promptCreation().then(async(input) => {
        let characterIds = input.split(',');
        let grid = Grid.getGrid();
        let playerATeamCount=grid[grid.length-1][grid[grid.length-1].length];
        //if number of characterIds given by Player B is not similar(in count) to Player A then Player B needs to give input again
        if(characterIds.length!=playerATeamCount){
            await execCommand('2');     
        }
        //if characterIds are valid then it will add characters into grid
        await checkAllCharactersAreValid(characterIds).then(async(allCharactersAreValid) => {
            if(allCharactersAreValid){
                await addCharactersInGrid('B', characterIds, Direction.getDirection("LOWER"), 0);
                await execCommand('3');
            }
            else{
                await execCommand('2');     
            }
        });
         
    });
});

addCommand("3", "Player A's Move: ", async () => {
    await promptCreation().then(async(input) => {
        //parameters : currentInput , PlayerId, nextCommand, currentCommand
        //this method will validate and make new move if it is valid other wise it will again ask player for input
        await makeMove(input, "A", '4', '3');
    });
});

addCommand("4", "Player B's Move: ", async () => {
    await promptCreation().then(async(input) => {
        //parameters : currentInput , PlayerId, nextCommand, currentCommand
        //this method will validate and make new move if it is valid other wise it will again ask player for input
        await makeMove(input, "B", '3', '4');
    });
});