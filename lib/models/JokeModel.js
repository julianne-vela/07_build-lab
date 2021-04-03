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

	static async updateJoke(id, jokeType, setup, punchLine, jokeId) {
		const { rows } = await pool.query(
			`UPDATE jokes
			SET joke_id= COALESCE( $1, joke_id ),
            joke_type= COALESCE( $2, joke_type ),
			setup= COALESCE( $3, setup ),
            punchline= COALESCE( $4, punchline )
			WHERE id=$5
			RETURNING *`,
			[jokeId, jokeType, setup, punchLine, id]
		);

		return new JokeModel(rows[0]);
	}

	static async deleteJoke(id) {
		const {
			rows,
		} = await pool.query('DELETE FROM jokes WHERE id=$1 RETURNING *', [id]);
	}
};
