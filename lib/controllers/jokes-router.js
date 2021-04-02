const { Router } = require('express');
const JokeService = require('../services/JokeService');

module.exports = Router().post('/', async (req, res, next) => {
	try {
		const joke = await JokeService.create(req.body);
		res.send(joke);
	} catch (err) {
		next(err);
	}
});
