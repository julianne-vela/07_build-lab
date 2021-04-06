const request = require('superagent');

const URL = 'https://official-joke-api.appspot.com/jokes';

async function getRandomJoke() {
	const res = await request.get(`${URL}/random`);

	return res.body;
}

async function getTenRandom() {
	const res = await request.get(`${URL}/ten`);

	return res.body;
}

async function getJokeByType({ type, quantity }) {
	// console.log(type, quantity);
	const res = await request.get(`${URL}/${type}/${quantity}`);
	return res.body;
}

module.exports = {
	getRandomJoke,
	getTenRandom,
	getJokeByType,
};
