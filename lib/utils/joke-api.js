const request = require('superagent');
const URL = 'https://official-joke-api.appspot.com/jokes';

export async function getRandomJoke() {
	const res = await request.get(`${URL}/jokes/random`);

	return res.body;
}
