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

		console.log(res.text);
		expect(res.body).toEqual({ details: 'this and that' });
	});
});
