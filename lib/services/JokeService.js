const JokeModel = require('../models/JokeModel');
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

	static async createJoke({
		jokeId,
		setup,
		punchLine,
		jokeType,
		contributorId,
	}) {
		const newJoke = await JokeModel.insertJoke(
			jokeId,
			setup,
			punchLine,
			jokeType,
			contributorId
		);

		await sendAWSEmail(newJoke);

		return { details: 'New joke added successfully!', data: newJoke };
	}
};

// Inject into email template and pass to AWS
