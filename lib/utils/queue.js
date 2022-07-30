const Deque = require('collections/deque');
const fetchQueue = new Deque();

const addItemIntoQueue = async(input) => {
	fetchQueue.push(input);
}

const removeItemFromQueue = async() => {
	return fetchQueue.shift();
}

module.exports  = {
	addItemIntoQueue,
	removeItemFromQueue
};