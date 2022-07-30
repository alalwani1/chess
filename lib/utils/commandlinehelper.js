'use strict';

const SortedArrayMap = require('collections/sorted-array-map');
const { addItemIntoQueue, removeItemFromQueue } = require('./queue');

//This map stores all UI commands.  Keys are the command string, values are objects with
//'command', 'description' and 'exec'.
const commands = new SortedArrayMap();

let nextLineConsumer;

let addCommand = (command, description, exec) => {
    commands.set(command.toLowerCase(), {command: command, description: description, exec: exec});
}

let printProvidedMenu = async(input) => {
	let item = input;
	addItemIntoQueue(input);
	let command = commands.get(input.toLowerCase());
	if(!command) {
        console.log(`Unknown command: ${input}`);
    }
    else {
    	console.log(`\n${command.description}`);
    }
}

let execCommand = async (input) => {
	printProvidedMenu(input);
	let item = await removeItemFromQueue();
    const command = commands.get(item.toLowerCase());
    if(!command) {
        console.log(`Unknown command: ${item}`);
    }
    else {
        command.exec();
    }
}

//An installed command may call consumeNextLine() to take additional input from the user.  The next
//input line will fulfill the returned Promise instead of executing another command.  The command
//itself is expected to print a prompt if needed.
let consumeNextLine = () => {
    return new Promise((resolve, reject) => {
        if(nextLineConsumer) {
            nextLineConsumer.reject(new Error('Another command took the next input line'));
        }
        nextLineConsumer = {resolve: resolve, reject: reject};
    });
}

let handleInputLine = async(input) => {
    if(nextLineConsumer) {
        nextLineConsumer.resolve(input);
        nextLineConsumer = undefined;
    }
    else {
        execCommand(input);
    }
}

module.exports  = {
	addCommand,
	execCommand,
	printProvidedMenu,
	handleInputLine,
	consumeNextLine
};
