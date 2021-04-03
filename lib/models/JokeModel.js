const pool = require('../utils/pool');

module.exports = class JokeModel {
	id;
	setup;
	punchLine;
	jokeType;
	jokeId;
	// userId;

	constructor(row) {
		const {
			id,
			setup,
			punchline,
			joke_type,
			joke_id,
			// linked_user
		} = row;

		this.id = id;
		this.setup = setup;
		this.punchLine = punchline;
		this.jokeType = joke_type;
		this.jokeId = joke_id;
		// this.userId = linked_user;
	}

	static async insertJoke(
		jokeId,
		setup,
		punchLine,
		jokeType
		// userId
	) {
		const { rows } = await pool.query(
			`INSERT INTO jokes(joke_id, setup, punchline, joke_type)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
			[jokeId, setup, punchLine, jokeType]
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

	static async updateJoke(id) {
		const { rows } = await pool.query(
			`UPDATE jokes
        SET jokeType = 'poor', 'punchLine = 'A met-gnome!'
        WHERE id=$1`,
			[id]
		);

		return new JokeModel(rows[0]);
	}
};
