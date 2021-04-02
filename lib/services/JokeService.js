const Joke = require('../models/Joke');
const User = require('../models/User');
const sendAWSEmail = require('../utils/aws-ses');

// Get Joke from API and munge into DB format
module.exports = class JokeService {
	static async getAllJokes() {
		const allJokes = await Joke.selectAllJokes();

		return { data: allJokes };
	}

	static async getOneJoke(id) {
		const oneJoke = await Joke.selectOneJoke(id);

		return { data: oneJoke };
	}

	static async createJoke({
		name,
		email,
		jokeId,
		setup,
		punchLine,
		jokeType,
		userId,
	}) {
		const user = await User.selectUserByName(name);

		if (user === 'invalid') {
			const newUser = await User.insertUser(name, email);
			userId = newUser.userId;
		} else {
			userId = user.userId;
		}

		const newJoke = await Joke.insertJoke(
			jokeId,
			setup,
			punchLine,
			jokeType,
			userId
		);

		await sendAWSEmail(name, newJoke);

		return { details: 'New joke added successfully!', data: newJoke };
	}
};

// Inject into email template and pass to AWS
