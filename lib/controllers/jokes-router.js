const { Router } = require('express');
const JokeService = require('../services/JokeService');

module.exports = Router()
	.get('/', async (req, res, next) => {
		try {
			const allJokes = await JokeService.getAllJokes();
			res.send(allJokes);
		} catch (err) {
			next(err);
		}
	})
	.get('/:id', async (req, res, next) => {
		try {
			const oneJoke = await JokeService.getOneJoke(req.params.id);
			res.send(oneJoke);
		} catch (err) {
			next(err);
		}
	})

	.post('/create', async (req, res, next) => {
		try {
			const newJoke = await JokeService.createJoke(req.body);

			res.send(newJoke);
		} catch (err) {
			next(err);
		}
	});
