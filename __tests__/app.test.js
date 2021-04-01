const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/aws-ses', () => () => ({
	ResponseMetaData: { RequestId: '11111111-1111' },
	MessageId: '1111111-1111111-111111-111111',
}));

describe('joke-api routes', () => {
	beforeEach(() => {
		return setup(pool);
	});
});
