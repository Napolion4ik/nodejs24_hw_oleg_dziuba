require("dotenv").config();
const fileSync = require("./file-sync");

fileSync.start("source", "target");
