// const pool = require('../utils/pool');

// module.exports = class UserModel {
// 	userId;
// 	userFirstName;
// 	userLastName;
// 	userEmail;

// 	constructor({ id, first_name, last_name, user_email }) {
// 		this.userId = id;
// 		this.userFirstName = first_name;
// 		this.userLastName = last_name;
// 		this.userEmail = user_email;
// 	}

// 	static async insertUser(userFirstName, userLastName, userEmail) {
// 		const { rows } = await pool.query(
// 			`INSERT INTO users(first_name, last_name, user_email)
//                 VALUES ($1, $2, $3)
//                 RETURNING *`,
// 			[userFirstName, userLastName, userEmail]
// 		);
// 		return new User(rows[0]);
// 	}

// 	static async selectUserByName(userFirstName, userLastName) {
// 		const {
// 			rows,
// 		} = await pool.query(
// 			'SELECT * FROM users WHERE first_name=$1 AND last_name=$2',
// 			[userFirstName, userLastName]
// 		);
// 	}
// };
