// const JokeModel = require('../models/JokeModel');
// // const UserModel = require('../models/UserModel');
// const sendAWSEmail = require('../utils/aws-ses');
// const {
// 	getRandomJoke,
// 	getTenRandom,
// 	getJokeByType,
// } = require('../utils/joke-api');

// // Get Joke from API and munge into DB format
// module.exports = class JokeService {
// 	static async createJoke(type, quantity) {
// 		if (!type) {
// 			if (quantity === 'ten') {
// 				const apiJokes = await getTenRandom();

// 				for (let newJoke of apiJokes) {
// 					jokeId = apiJoke.id;
// 					setup = apiJoke.setup;
// 					punchLine = apiJoke.punchline;
// 					jokeType = apiJoke.type;
// 					newJoke = await JokeModel.insertJoke(
// 						jokeId,
// 						setup,
// 						punchLine,
// 						jokeType
// 						// userId
// 					);

// 					await sendAWSEmail(newJoke);
// 					return {
// 						details: 'New joke added successfully!',
// 						data: newJoke,
// 					};
// 				}
// 			} else {
// 				const apiJoke = await getRandomJoke();
// 				jokeId = apiJoke.id;
// 				setup = apiJoke.setup;
// 				punchLine = apiJoke.punchline;
// 				jokeType = apiJoke.type;

// 				const newJoke = await JokeModel.insertJoke(
// 					jokeId,
// 					setup,
// 					punchLine,
// 					jokeType
// 					// userId
// 				);

// 				await sendAWSEmail(newJoke);
// 				return { details: 'New joke added successfully!', data: newJoke };
// 			}
// 		} else if (type) {
// 			if (quantity === 'ten') {
// 				const apiJokes = await getJokeByType(type, quantity);

// 				for (let joke of apiJokes) {
// 					jokeId = apiJoke.id;
// 					setup = apiJoke.setup;
// 					punchLine = apiJoke.punchline;
// 					jokeType = apiJoke.type;
// 					joke = await JokeModel.insertJoke(
// 						jokeId,
// 						setup,
// 						punchLine,
// 						jokeType
// 						// userId
// 					);

// 					await sendAWSEmail(joke);
// 					return { details: 'New joke added successfully!', data: joke };
// 				}
// 				// } else {
// 				// 	const apiJoke = await getJokeByType(type, quantity);
// 				// 	jokeId = apiJoke.id;
// 				// 	setup = apiJoke.setup;
// 				// 	punchLine = apiJoke.punchline;
// 				// 	jokeType = apiJoke.type;

// 				// 	const newJoke = await JokeModel.insertJoke(
// 				// 		jokeId,
// 				// 		setup,
// 				// 		punchLine,
// 				// 		jokeType
// 				// 		// userId
// 				// 	);

// 				// 	await sendAWSEmail(newJoke);
// 				// 	return { details: 'New joke added successfully!', data: newJoke };
// 				// }
// 			}
// 			// const user = await UserModel.selectUserById(userId);
// 			// console.log(user, 'service');

// 			// if (user === 'invalid') {
// 			// 	const newUser = await UserModel.insertUser(user);
// 			// 	userId = newUser.id;
// 			// } else {
// 			// 	userId = user.id;
// 			// }
// 		}
// 	}

// 	static async getAllJokes() {
// 		const allJokes = await JokeModel.selectAllJokes();

// 		return allJokes;
// 	}

// 	static async getOneJoke(id) {
// 		const oneJoke = await JokeModel.selectOneJoke(id);

// 		return { data: oneJoke };
// 	}

// 	static async changeJoke({ id }, { jokeType, setup, punchLine, jokeId }) {
// 		const updatedJoke = await JokeModel.updateJoke(
// 			id,
// 			jokeType,
// 			setup,
// 			punchLine,
// 			jokeId
// 		);

// 		return updatedJoke;
// 	}

// 	static async removeJoke(id) {
// 		const deletedJoke = await JokeModel.deleteJoke(id);

// 		return {
// 			details: `Deleted Joke #${id}`,
// 			data: deletedJoke,
// 		};
// 	}
// };

// // Inject into email template and pass to AWS
