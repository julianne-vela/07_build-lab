const pool = require('../utils/pool');

module.exports = class FavoriteModel {
	setup;
	punchline;
	userName;
	phoneNumber;
	userId;

	constructor(row) {
		const { setup, punchline, user_name, phone_number, user_id } = row;

		this.setup = setup;
		this.punchline = punchline;
		this.userName = user_name;
		this.phoneNumber = phone_number;
		this.userId = user_id;
	}

	static async insertFavorite(setup, punchline, userName, phoneNumber, userId) {
		const { rows } = await pool.query(
			`INSERT INTO favorites(setup, punchline, user_name, phone_number, user_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
			[setup, punchline, userName, phoneNumber, userId]
		);
		return new FavoriteModel(rows[0]);
	}
};
