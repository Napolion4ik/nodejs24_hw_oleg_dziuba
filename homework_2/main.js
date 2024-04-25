require("dotenv").config();

const logger = require("./utils/logger")("main");

logger.info(
	"Видимість 100%",
	"Висота 5000 км на уровнем моря",
	"До запуски ракети на московію готовий"
);
logger.warn("Прибори 220", "Знижаєм висоту");
logger.error("ALARM", "ВІДМОВА ЛІВОГО ДВИГУНА", "ALARM");
