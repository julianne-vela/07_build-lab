// static async createUser(name, email) {
//         const {
//             rows,
//         } = await pool.query(
//             `INSERT INTO users(user_name, user_email)
//             VALUES ($1, $2)
//             RETURNING *`,
//             [name, email]
//         )
