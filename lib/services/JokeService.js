const Joke = require('../models/Joke');
const User = require('../models/User');
const sendAWSEmail = require('../utils/aws-ses');

// Get Joke from API and munge into DB format
module.exports = class JokeService {
	static async getAllJokes() {
		const allJokes = await Joke.getAllJokes();

		return { data: allJokes };
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
		const user = await User.getUserByName(name);

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
