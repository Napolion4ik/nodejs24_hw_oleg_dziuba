const redColor = "\x1b[31m";
const orangeColor = "\x1b[33m";
const blueColor = "\x1b[34m";
const resetColor = "\x1b[0m";

function logger(identifier) {
	const info = (text) => {
		console.info(
			blueColor,
			`-------------------------------${resetColor}\n`
		);
		console.info(`${identifier}: ${blueColor} ${text}`);
		console.info(blueColor, "\n-------------------------------");
	};

	const warn = (text) => {
		console.warn(
			orangeColor,
			`------------------------------- ${resetColor}\n`
		);
		console.warn(`${identifier}: ${orangeColor} ${text}`);
		console.warn(orangeColor, "\n-------------------------------");
	};
	const error = (text) => {
		console.error(
			redColor,
			`-------------------------------${resetColor}\n`
		);
		console.error(`${identifier}: ${redColor} ${text}`);
		console.error(
			redColor,
			`\n-------------------------------${resetColor}`
		);
	};
	return {
		info,
		warn,
		error,
	};
}

module.exports = logger;
