const fs = require("fs");
const colors = require("colors");
const config = require("config");
const path = require("path");

const logsDir = path.resolve(__dirname, "../logs");

function writeLogsToFile(writeStream, message, massageServer) {
	const date = new Date().toISOString();
	writeStream.write(`${message}: [${massageServer.join(", ")}] ${date} \n`);
}

let initialized = false;
let writeableStreamInfo, writeableStreamError;

function logger(identifier) {
	if (!config.get("colorsEnabled")) {
		colors.disable();
	}

	if (!initialized) {
		if (!fs.existsSync(logsDir)) {
			fs.mkdir(logsDir, (err) => {
				console.error(err);
			});
		}
		writeableStreamInfo = fs.createWriteStream(
			path.join(logsDir, "info.log"),
			{ flags: "a" }
		);
		writeableStreamError = fs.createWriteStream(
			path.join(logsDir, "errors.log"),
			{ flags: "a" }
		);
		initialized = true;
	}

	const info = (...text) => {
		writeLogsToFile(writeableStreamInfo, "Info logger", text);
		if (config.get("logLevel") === "info") {
			console.log(`-------------------------------\n`.rainbow);
			console.log(identifier.green.bgCyan, ": ", text.join(" | "));
			console.log("\n-------------------------------".rainbow);
		}
	};

	const warn = (...text) => {
		writeLogsToFile(writeableStreamError, "Warn logger", text);
		if (config.get("logLevel") !== "error") {
			console.warn(`---------------------------------\n`.rainbow);
			console.warn(identifier.bgYellow.cyan, ": ", text.join(" | "));
			console.warn("\n-------------------------------".rainbow);
		}
	};
	const error = (...text) => {
		writeLogsToFile(writeableStreamError, "Error logger", text);
		console.error(`-------------------------------\n`.brightRed);
		console.error(identifier.brightRed, ": ", text.join(" | "));
		console.error(`\n-------------------------------`.brightRed);
	};
	return {
		info,
		warn,
		error,
	};
}

process.on("beforeExit", () => {
	writeableStreamInfo.end();
	writeableStreamError.end();
});

module.exports = logger;
