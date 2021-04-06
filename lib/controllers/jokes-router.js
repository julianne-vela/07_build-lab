// const { Router } = require('express');
// const JokeService = require('../services/JokeService');

// module.exports = Router()
// 	.get('/', async (req, res, next) => {
// 		try {
// 			const allJokes = await JokeService.getAllJokes();
// 			res.send(allJokes);
// 		} catch (err) {
// 			next(err);
// 		}
// 	})
// 	.get('/:id', async (req, res, next) => {
// 		try {
// 			const oneJoke = await JokeService.getOneJoke(req.params.id);
// 			res.send(oneJoke);
// 		} catch (err) {
// 			next(err);
// 		}
// 	})
// 	.get('/random', async (req, res, next) => {
// 		try {
// 			const oneJoke = await JokeService.getRandomJoke();
// 			res.send(oneJoke);
// 		} catch (err) {
// 			next(err);
// 		}
// 	})
// 	.post('/create', async (req, res, next) => {
// 		try {
// 			const newJoke = await JokeService.createJoke(req.body);

// 			res.send(newJoke);
// 		} catch (err) {
// 			next(err);
// 		}
// 	})
// 	.put('/:id', async (req, res, next) => {
// 		try {
// 			const updatedJoke = await JokeService.changeJoke(req.params, req.body);
// 			res.send(updatedJoke);
// 		} catch (err) {
// 			next(err);
// 		}
// 	})
// 	.delete('/:id', async (req, res, next) => {
// 		try {
// 			const deletedJoke = await JokeService.removeJoke(req.params.id);
// 			res.send(deletedJoke);
// 		} catch (err) {
// 			next(err);
// 		}
// 	});
