const colors = require("colors");
const config = require("config");

function logger(identifier) {
	if (!config.get("colorsEnabled")) {
		colors.disable();
	}

	const info = (...text) => {
		if (config.get("logLevel") === "info") {
			console.log(`-------------------------------\n`.rainbow);
			console.log(identifier.green.bgCyan, ": ", text.join(" | "));
			console.log("\n-------------------------------".rainbow);
		}
	};

	const warn = (...text) => {
		if (config.get("logLevel") !== "error") {
			console.warn(`---------------------------------\n`.rainbow);
			console.warn(identifier.bgYellow.cyan, ": ", text.join(" | "));
			console.warn("\n-------------------------------".rainbow);
		}
	};
	const error = (...text) => {
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

module.exports = logger;
