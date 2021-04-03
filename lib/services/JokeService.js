const JokeModel = require('../models/JokeModel');
// const UserModel = require('../models/UserModel');
const sendAWSEmail = require('../utils/aws-ses');

// Get Joke from API and munge into DB format
module.exports = class JokeService {
	static async getAllJokes() {
		const allJokes = await JokeModel.selectAllJokes();

		return { data: allJokes };
	}

	static async getOneJoke(id) {
		const oneJoke = await JokeModel.selectOneJoke(id);

		return { data: oneJoke };
	}

	static async createJoke({ jokeId, setup, punchLine, jokeType }) {
		// const user = await UserModel.selectUserById(userId);
		// console.log(user, 'service');

		// if (user === 'invalid') {
		// 	const newUser = await UserModel.insertUser(user);
		// 	userId = newUser.id;
		// } else {
		// 	userId = user.id;
		// }

		const newJoke = await JokeModel.insertJoke(
			jokeId,
			setup,
			punchLine,
			jokeType
			// userId
		);

		await sendAWSEmail(newJoke);

		return { details: 'New joke added successfully!', data: newJoke };
	}

	static async changeJoke({ id }, { jokeType, setup, punchLine, jokeId }) {
		const updatedJoke = await JokeModel.updateJoke(
			id,
			jokeType,
			setup,
			punchLine,
			jokeId
		);

		return updatedJoke;
	}
};

// Inject into email template and pass to AWS
