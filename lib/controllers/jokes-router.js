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
	});

//     .post('/', async (req, res, next) => {
// 	try {
// 		const joke = await JokeService.create(req.body);
// 		res.send(joke);
// 	} catch (err) {
// 		next(err);
// 	}
// })
