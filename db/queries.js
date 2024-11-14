const pool = require("./pool");

//GET
async function getAllPosts() {
	const { rows } = await pool.query("SELECT * FROM posts");
	return rows;
}

async function getOnePost(id) {
	const { rows } = await pool.query("SELECT * FROM posts WHERE id = ($1)", [
		id,
	]);
	return rows;
}

async function getPostComments(id) {
	const { rows } = await pool.query(
		"SELECT * FROM comments WHERE post_id = ($1)",
		[id]
	);
	return rows;
}
//GET

//DELETE
async function deleteOnePost(id) {
	await pool.query("DELETE FROM comments WHERE post_id = ($1)", [id]);
	const result = await pool.query("DELETE FROM posts WHERE id = ($1)", [id]);
	return result.rowCount;
}
async function deleteOneComment(id) {
	const result = await pool.query("DELETE FROM comments WHERE id = ($1)", [id]);
	return result.rowCount;
}
//DELETE

//PUT
async function updatePostStatus(id, status) {
	//archived или published
	const result = await pool.query(
		"UPDATE posts SET status = $1 WHERE id = $2",
		[status, id]
	);
	return result.rowCount; // Возвращает количество обновленных строк
}
async function updatePost(id, title, content) {
	const fields = [];
	const values = [];

	if (title) {
		fields.push("title = $1");
		values.push(title);
	}
	if (content) {
		fields.push("content = $" + (fields.length + 1));
		values.push(content);
	}

	values.push(id);

	const query = `
        UPDATE posts 
        SET ${fields.join(", ")} 
        WHERE id = $${fields.length + 1}
    `;

	const result = await pool.query(query, values);
	return result.rowCount;
}
//PUT

//POST
async function addOnePost(title, content, author_id) {
	//console.log(title, " ", content, " ", author_id);
	const result = await pool.query(
		"INSERT INTO posts (title, content, status, author_id) VALUES (($1), ($2), 'archived', ($3))",
		[title, content, author_id]
	);
	return result.rowCount;
}
async function addOneComment(post_id, content, author_id) {
	try {
		const result = await pool.query(
			"INSERT INTO comments (content, author_id, post_id) VALUES ($1, $2, $3)",
			[content, author_id, post_id]
		);
		return result.rowCount;
	} catch (err) {
		console.error("Database error:", err);
		throw err;
	}
}
async function addUser(username, password, role) {
	try {
		await pool.query(
			"INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
			[username, password, role]
		);
	} catch (err) {
		console.error("Database error:", err);
		throw err;
	}
}
//POST

module.exports = {
	getAllPosts,
	getOnePost,
	getPostComments,
	deleteOnePost,
	deleteOneComment,
	updatePostStatus,
	updatePost,
	addOnePost,
	addOneComment,
	addUser,
};
