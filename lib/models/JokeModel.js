const pool = require('../utils/pool');

module.exports = class JokeModel {
	id;
	setup;
	punchLine;
	jokeType;
	jokeId;
	contributorId;

	constructor(row) {
		const { id, setup, punchline, joke_type, joke_id, contributor_id } = row;

		this.id = id;
		this.setup = setup;
		this.punchLine = punchline;
		this.jokeType = joke_type;
		this.jokeId = joke_id;
		this.contributorId = contributor_id;
	}

	static async insertJoke(jokeId, setup, punchLine, jokeType, contributorId) {
		const { rows } = await pool.query(
			`INSERT INTO jokes(joke_id, setup, punchline, joke_type, contributor_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
			[jokeId, setup, punchLine, jokeType, contributorId]
		);
		return new JokeModel(rows[0]);
	}

	static async selectAllJokes() {
		const { rows } = await pool.query('SELECT * FROM jokes');
		return rows.map((joke) => new JokeModel(joke));
	}

	static async selectOneJoke(id) {
		const { rows } = await pool.query('SELECT * FROM jokes WHERE id=$1', [id]);

		return new JokeModel(rows[0]);
	}
};
