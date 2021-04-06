const FavoriteModel = require('../models/FavoriteModel');
const UserModel = require('../models/UserModel');
const sendSms = require('../utils/twilio');

module.exports = class FavoriteService {
	static async createFavorite({
		setup,
		punchline,
		userName,
		phoneNumber,
		userId,
	}) {
		const user = await UserModel.selectUserById(userId);

		if (user === 'invalid') {
			const newUser = await UserModel.insertUser(user);

			userId = newUser.id;
		} else {
			userId = user.id;
		}

		const joke = FavoriteModel.insertFavorite(
			setup,
			punchline,
			userName,
			phoneNumber,
			userId
		);

		await sendSms(joke);
		return {
			details: `Favorite Joke saved for ${userName}`,
			data: joke,
		};
	}
};
