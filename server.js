require("dotenv").config();
const http = require("http");
const path = require("path");
const config = require("config");
const fs = require("fs");
const logger = require("./utils/logger")("server");

const port = config.get("port");

const getStaticFile = (res) => {
	fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
		if (err) {
			res.statusCode = 500;
			res.end();
			return;
		}
		res.end(data);
	});
};

const app = http.createServer((req, res) => {
	const url = req.url;
	if (req.method === "GET") {
		switch (url) {
			case "/healthcheck":
				res.writeHead(200, { "Content-Type": "text/html" });
				logger.info(req.method, url, 200);
				res.end("healthcheck passed");
				// getStaticFile(res); // Метод для отримання html файлу
				break;
			default:
				res.statusCode = 404;
				logger.warn(req.method, url, 404);
				res.end();
		}
	} else {
		res.statusCode = 404;
		logger.warn(req.method, url, 404);
		res.end();
	}
});

app.listen(port, () => {
	logger.info(`Сервер запущено на порту ${port}`);
});
