const pool = require('../utils/pool');

module.exports = class UserModel {
	userId;
	userName;
	phoneNumber;

	constructor({ id, user_name, phone_number }) {
		this.userId = id;
		this.userName = user_name;
		this.phoneNumber = phone_number;
	}

	static async insertUser(userName, phoneNumber) {
		const { rows } = await pool.query(
			`INSERT INTO users(user_name, phone_number)
                VALUES ($1, $2)
                RETURNING *`,
			[userName, phoneNumber]
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
