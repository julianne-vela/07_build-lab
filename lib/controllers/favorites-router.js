const { Router } = require('express');
const FavoriteService = require('../services/FavoriteService');

module.exports = Router().post('/', async (req, res, next) => {
	try {
		const favorite = await FavoriteService.createFavorite(req.body);

		res.send(favorite);
	} catch (err) {
		next(err);
	}
});
