const pool = require('../utils/pool');

module.exports = class Joke {
	setup;
	punchLine;
	jokeType;
	jokeId;

	constructor(row) {
		const { setup, punchline, joke_type, joke_id } = row;

		this.setup = setup;
		this.punchLine = punchline;
		this.jokeType = joke_type;
		this.jokeId = joke_id;
	}

	static async createJoke(jokeId, setup, punchLine, jokeType) {
		const { rows } = await pool.query(
			`INSERT INTO jokes(joke_id, setup, punchline, joke_type)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
			[jokeId, setup, punchLine, jokeType]
		);
		return new Joke(rows[0]);
	}
};
