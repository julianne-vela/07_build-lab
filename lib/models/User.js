const pool = require('../utils/pool');

module.exports = class User {
	userId;
	userName;
	userEmail;

	constructor({ user_id, user_name, user_email }) {
		this.userId = user_id;
		this.userName = user_name;
		this.userEmail = user_email;
	}

	static async insertUser(userName, userEmail) {
		const { rows } = await pool.query(
			`INSERT INTO users(user_name, user_email)
                VALUES ($1, $2)
                RETURNING *`,
			[userName, userEmail]
		);
		return new User(rows[0]);
	}

	static async selectUserByName(name) {
		const {
			rows,
		} = await pool.query('SELECT * FROM users WHERE user_name=$1 RETURNING *', [
			name,
		]);
	}
};
