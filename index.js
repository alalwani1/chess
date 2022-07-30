'use strict';

const readline = require('readline');
const { handleInputLine } = require('./lib/utils/commandlinehelper');
const commandLineReader = require('./lib/handlers/commandlinereader');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    handleInputLine(line);
});

handleInputLine('1');
process.on('unhandledRejection', (err) => {
    //console.log(`Unhandled promise rejection:`, err);
});