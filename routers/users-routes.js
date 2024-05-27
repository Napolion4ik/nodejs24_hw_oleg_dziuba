const { Router } = require("express");
const { userValidate, userIdValidate } = require("../middlewares/validator.js");
const {
	getUserList,
	getCharacter,
	addCharacter,
	deleteUser,
} = require("../models/userService.js");

const router = Router();

// POST

router.post("/", userValidate, (req, res) => {
	addCharacter(req.body);
	res.redirect("/");
});

// GET

router.get("/", (req, res) => {
	const characters = getUserList();
	res.render("index", { characters, title: "Острів скарбів" });
});

router.get("/:userId", userIdValidate, (req, res) => {
	const character = getCharacter(req.params.userId);
	res.render("character", { character, title: character.name });
});

// DELETE

router.delete("/:userId", userIdValidate, (req, res) => {
	deleteUser(req.params.userId);
	res.send({ message: "delete user" });
});

module.exports = router;
