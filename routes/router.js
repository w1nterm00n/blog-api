const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

//GET
router.get("/posts", (req, res) => {
	controller.getPosts(req, res);
});
router.get("/posts/:id", (req, res) => {
	controller.getPost(req, res);
});
router.get("/posts/:id/comments", (req, res) => {
	controller.getComments(req, res);
});
//GET

//DELETE
router.delete("/posts/:id", (req, res) => {
	controller.deletePost(req, res);
});
router.delete("/posts/:id/comments/:id", (req, res) => {
	controller.deleteComment(req, res);
});
//DELETE

//PUT
router.put("/posts/:id/status", (req, res) => {
	controller.updatePostStatus(req, res);
});
router.put("/posts/:id/change", (req, res) => {
	controller.updatePostContent(req, res);
});
//PUT

//POST
router.post("/posts", (req, res) => {
	controller.addPost(req, res);
});
router.post("/posts/:id/comments", (req, res) => {
	controller.addComment(req, res);
});
router.post("/users", (req, res) => {
	controller.addUser(req, res);
});
//POST
module.exports = router;

//change posts title and content

// curl -X PUT http://localhost:3088/posts/1/change \
// -H "Content-Type: application/json" \
// -d '{"title": "la la la", "content": "Updated content goes here"}'

//change post status

// curl -X PUT http://localhost:3088/posts/1 \
// -H "Content-Type: application/json" \
// -d '{"status": "archived"}'

//add new post

// curl -X POST http://localhost:3088/posts \
// -H "Content-Type: application/json" \
// -d '{"title": "title2", "content": "lorem ipsum", "author_id": 1}'

//add new comment

// curl -X POST http://localhost:3088/posts/1/comments \
// -H "Content-Type: application/json" \
// -d '{"content": "new comment!!!! by Kartman", "author_id": 2}'

//add new user :

// curl -X POST http://localhost:3088/users \
// -H "Content-Type: application/json" \
// -d '{"username": "daria123", "password": "huiGovnA", "role": "user"}'
