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

	it('returns all jokes in the DB', async () => {
		const res = await request(app).get('/api/v1/jokes');

		expect(res.body).toEqual({
			data: [
				{
					setup: 'Why did the scarecrow win an award?',
					punchLine: 'Because he was outstanding in his field.',
					jokeType: 'general',
					jokeId: 348,
					userId: 1,
				},
				{
					setup:
						'What do you call a fashionable lawn statue with an excellent sense of rhythmn?',
					punchLine: 'A metro-gnome',
					jokeType: 'general',
					jokeId: 216,
					userId: 1,
				},
				{
					setup: 'How many kids with ADD does it take to change a lightbulb?',
					punchLine: 'Lets go ride bikes!',
					jokeType: 'general',
					jokeId: 142,
					userId: 2,
				},
				{
					setup: 'A DHCP packet walks into a bar and asks for a beer.',
					punchLine:
						'Bartender says, here, but I’ll need that back in an hour!',
					jokeType: 'programming',
					jokeId: 384,
					userId: 2,
				},
				{
					setup: 'What creature is smarter than a talking parrot?',
					punchLine: 'A spelling bee.',
					jokeType: 'general',
					jokeId: 160,
					userId: 3,
				},
			],
		});
	});
});
