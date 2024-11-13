const express = require("express");
const app = express();
const router = require("./routes/router");
const { v4: uuidv4 } = require("uuid");
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World");
});

//настройка порта
const PORT = 3088;
const server = app.listen(PORT, () =>
	console.log(`Express app listening on port ${PORT}!`)
);
