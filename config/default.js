const config = {
	colorsEnabled: +process.env.COLORS_ENABLED || 0,
	logLevel: process.env.LOG_LEVEL || "warn",
};

module.exports = config;
