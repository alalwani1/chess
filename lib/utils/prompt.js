const { consumeNextLine } = require('./commandlinehelper');

/**
 * Prompts the user for all necessary inputs to create an item. These inputs are returned as a 
 * promise.
 * 
 * @returns
 * A promise that resolves to [input]
 */
let promptCreation = async() => {
    return new Promise(async (resolve) => {
        let input = await consumeNextLine();
        resolve(input);
    });
}

module.exports = {
	promptCreation
}