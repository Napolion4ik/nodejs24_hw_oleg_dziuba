const { Router } = require("express");
const { userValidate, userIdValidate } = require("../middlewares/validator.js");

const router = Router();

// POST

router.post("/", userValidate, (req, res) => {
	res.send({ message: "User created" });
});

// GET

router.get("/", (req, res) => {
	res.status(200).send([]);
});

router.get("/:userId", userIdValidate, (req, res) => {
	res.status(200).send({ userId: req.params.userId });
});

// DELETE

router.delete("/:userId", userIdValidate, (req, res) => {
	res.sendStatus(204);
});

module.exports = router;
