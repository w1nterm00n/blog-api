const db = require("../db/queries");

//GET
exports.getPosts = async (req, res, next) => {
	try {
		let posts = await db.getAllPosts();
		return res.send(posts);
	} catch (err) {
		return res.status(400).json({ error: "Error getting posts" });
	}
};
exports.getPost = async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	try {
		let post = await db.getOnePost(id);
		return res.send(post);
	} catch (err) {
		return res.status(400).json({ error: "Error getting post" });
	}
};
exports.getComments = async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	try {
		let post = await db.getPostComments(id);
		return res.send(post);
	} catch (err) {
		return res.status(400).json({ error: "Error getting post comments" });
	}
};
//GET

//DELETE
exports.deletePost = async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	try {
		const deletedCount = await db.deleteOnePost(id);
		if (deletedCount === 0) {
			return res.status(404).json({ error: `Post with id ${id} not found` });
		}

		return res.send(`Post with id ${id} successfully deleted!`);
	} catch (err) {
		console.error("Error deleting post:", err);
		return res.status(500).json({ error: `Error deleting post with id ${id}` });
	}
};
exports.deleteComment = async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	try {
		const deletedCount = await db.deleteOneComment(id);
		if (deletedCount === 0) {
			return res.status(404).json({ error: `Comment with id ${id} not found` });
		}

		return res.send(`Comment with id ${id} successfully deleted!`);
	} catch (err) {
		console.error("Error deleting comment:", err);
		return res
			.status(500)
			.json({ error: `Error deleting comment with id ${id}` });
	}
};
//DELETE

//UPDATE
exports.updatePostStatus = async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	const { status } = req.body;

	if (!status || typeof status !== "string") {
		return res.status(400).json({ error: "Invalid or missing status" });
	}

	try {
		const result = await db.updatePostStatus(id, status);
		if (result === 0) {
			return res.status(404).json({ error: `Post with id ${id} not found` });
		}

		return res.json({
			message: `Post with id ${id} updated to status: ${status}`,
		});
	} catch (err) {
		console.error("Error updating post status:", err);
		return res.status(500).json({ error: "Error updating post status" });
	}
};
exports.updatePostContent = async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	const { title, content } = req.body;

	// Проверка, есть ли что обновлять
	if (!title && !content) {
		return res
			.status(400)
			.json({ error: "Nothing to update. Provide title or content." });
	}

	try {
		const result = await db.updatePost(id, title, content);

		if (result === 0) {
			return res.status(404).json({ error: `Post with id ${id} not found` });
		}

		return res.json({ message: `Post with id ${id} successfully updated!` });
	} catch (err) {
		console.error("Error updating post:", err);
		return res.status(500).json({ error: "Error updating post" });
	}
};
//UPDATE

//POST
exports.addPost = async (req, res, next) => {
	const { title, content, author_id } = req.body;
	//по дефолту когда создаётся пост, его статус archived
	try {
		const result = await db.addOnePost(title, content, author_id);
		if (result === 0) {
			return res.status(404).json({ error: `Author does not exist` });
		}
		return res.send("succesfully posted");
	} catch (err) {
		return res.status(400).json({ error: "Error adding post" });
	}
};
exports.addComment = async (req, res, next) => {
	const { content, author_id } = req.body;
	const post_id = parseInt(req.params.id, 10);
	try {
		const result = await db.addOneComment(post_id, content, author_id);
		if (result === 0 || !result) {
			return res.status(404).json({ error: `Post or author does now exist` });
		}
		return res.send("succesfully posted");
	} catch (err) {
		return res.status(400).json({ error: "Error adding comment" });
	}
};
exports.addUser = async (req, res, next) => {
	const { username, password, role } = req.body;
	try {
		await db.addUser(username, password, role);
		return res.send("user succesfully added");
	} catch (err) {
		if (err.code === "23505") {
			return res.status(400).json({ error: "This username already exists" });
		}
		return res.status(400).json({ error: "Error adding user" });
	}
};

//POST
