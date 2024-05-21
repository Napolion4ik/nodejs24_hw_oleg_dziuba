require("dotenv").config();
const express = require("express");
const config = require("config");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const usersRouter = require("./routers/users-routes.js");

const app = express();

const port = config.get("port");

morgan.token("date", () => {
	return new Date().toISOString();
});

const logDirectory = path.join(__dirname, "logs");

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
	interval: "1d",
	path: logDirectory,
	compress: true,
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(morgan(":date :method :url :status"));

app.use(express.json());

app.listen(port, (err) => {
	if (err) {
		console.error("Помилка при запуску сервера: ", err);
		process.exit(1); // Завершити процес з кодом помилки
	}

	console.log("Сервер працює на порту: ", port);
});

app.use("/users", usersRouter);

app.use((req, res) => {
	res.status(404).send({ error: "Not Found" });
});
