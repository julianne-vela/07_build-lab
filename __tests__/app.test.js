const pool = require('../lib/utils/pool');
const setupTest = require('../data/setup-test-db');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/aws-ses', () => () => ({
	ResponseMetaData: { RequestId: '11111111-1111' },
	MessageId: '1111111-1111111-111111-111111',
}));

describe('Joke CRUD Routes', () => {
	beforeEach(() => {
		return setupTest(pool);
	});
	afterAll(() => {
		return setupTest(pool);
	});

	// GET ALL
	it('returns all jokes in the DB', async () => {
		const res = await request(app).get('/api/v1/jokes');

		expect(res.body).toEqual({
			data: [
				{
					id: 1,
					setup: 'Why did the scarecrow win an award?',
					punchLine: 'Because he was outstanding in his field.',
					jokeType: 'general',
					jokeId: 348,
				},
				{
					id: 2,
					setup:
						'What do you call a fashionable lawn statue with an excellent sense of rhythmn?',
					punchLine: 'A metro-gnome',
					jokeType: 'general',
					jokeId: 216,
				},
				{
					id: 3,
					setup: 'How many kids with ADD does it take to change a lightbulb?',
					punchLine: 'Lets go ride bikes!',
					jokeType: 'general',
					jokeId: 142,
				},
				{
					id: 4,
					setup: 'A DHCP packet walks into a bar and asks for a beer.',
					punchLine:
						'Bartender says, here, but I’ll need that back in an hour!',
					jokeType: 'programming',
					jokeId: 384,
				},
				{
					id: 5,
					setup: 'What creature is smarter than a talking parrot?',
					punchLine: 'A spelling bee.',
					jokeType: 'general',
					jokeId: 160,
				},
			],
		});
	});

	// GET BY ID
	it('returns a single joke based on ID', async () => {
		const res = await request(app).get('/api/v1/jokes/1');

		expect(res.body).toEqual({
			data: {
				id: 1,
				setup: 'Why did the scarecrow win an award?',
				punchLine: 'Because he was outstanding in his field.',
				jokeType: 'general',
				jokeId: 348,
			},
		});
	});

	// POST NEW JOKE
	it('creates a new joke and inserts it into the DB', async () => {
		// const newUser = {
		// 	first_name: 'Juli',
		// 	last_name: 'Vela',
		// 	user_email: 'julianne@nessimaskye.com',
		// 	id: 4,
		// };
		// console.log(newUser);

		const newJoke = {
			setup: 'What is the object-oriented way to become wealthy?',
			punchLine: 'Inheritance',
			jokeType: 'programming',
			jokeId: 1,
		};

		const res = await request(app).post('/api/v1/jokes/create').send(newJoke);

		expect(res.body).toEqual({
			details: 'New joke added successfully!',
			data: { ...newJoke, id: 6 },
		});
	});

	// PUT UPDATE EXISTING JOKE
	it('updates an existing joke within the DB', async () => {
		const updatedJoke = {
			jokeId: 216,
			setup:
				'What do you call a fashionable lawn statue with an excellent sense of rhythmn?',
			punchLine: 'A met-gnome',
			jokeType: 'lame',
		};

		const res = await request(app).put('/api/v1/jokes/2').send(updatedJoke);

		expect(res.body).toEqual({ ...updatedJoke, id: 2 });
	});

	// DELETE JOKE
	it('deletes a joke and returns the deleted row content', async () => {
		const res = await request(app).delete('/api/v1/jokes/2');

		expect(res.body).toEqual({
			details: 'Deleted Joke #2',
			data: {
				id: 2,
				setup:
					'What do you call a fashionable lawn statue with an excellent sense of rhythmn?',
				punchLine: 'A metro-gnome',
				jokeType: 'general',
				jokeId: 216,
			},
		});
	});
});
