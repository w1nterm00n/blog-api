const pool = require("./pool");

// async function getAllUsernames() {
// 	const { rows } = await pool.query("SELECT * FROM usernames");
// 	return rows;
// }

// async function insertUsername(username) {
// 	await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);

// 	//same as:
// 	//await pool.query("INSERT INTO usernames (username) VALUES ('" + username + "')");
// }

// module.exports = {
// 	getAllUsernames,
// 	insertUsername,
// };
