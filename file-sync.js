const fs = require("fs").promises;
const path = require("path");
const logger = require("./utils/logger")("main");

async function start(sourceFolder, targetFolder) {
	try {
		const itemsPackages = await fs.readdir(sourceFolder);

		for (const item of itemsPackages) {
			const sourcePath = path.join(sourceFolder, item);
			const targetPath = path.join(targetFolder, item);

			const stats = await fs.stat(sourcePath);

			const newTargetDir = path.join(
				targetFolder,
				path.basename(sourcePath)
			);

			if (stats.isDirectory()) {
				try {
					await fs.access(newTargetDir);
					logger.warn(`Папка вже існує: ${newTargetDir}`);
					await start(sourcePath, targetPath);
					continue;
				} catch (err) {}
				await fs.mkdir(newTargetDir);
				await start(sourcePath, targetPath);
			} else {
				try {
					await fs.access(newTargetDir);
					logger.warn(`Файл вже існує: ${newTargetDir}`);
					continue;
				} catch (err) {}
				await fs.copyFile(sourcePath, targetPath);
				logger.info(
					`Каталог ${sourcePath} скопійовано у ${targetPath}`
				);
			}
		}
	} catch (error) {
		logger.error(`Помилка під час копіювання: ${error}`);
	}
}

module.exports = {
	start,
};
