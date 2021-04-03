const pool = require('../utils/pool');

module.exports = class UserModel {
	userId;
	userFirstName;
	userLastName;
	userEmail;

	constructor({ id, first_name, last_name, user_email }) {
		this.userId = id;
		this.userFirstName = first_name;
		this.userLastName = last_name;
		this.userEmail = user_email;
	}

	static async insertUser(userFirstName, userLastName, userEmail) {
		const { rows } = await pool.query(
			`INSERT INTO users(first_name, last_name, user_email)
                VALUES ($1, $2, $3)
                RETURNING *`,
			[userFirstName, userLastName, userEmail]
		);
		return new User(rows[0]);
	}

	static async selectUserById(id) {
		const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

		if (rows.length === 0) {
			return 'invalid';
		}

		return new UserModel(rows[0]);
	}
};
