const yup = require("yup");

const userShema = yup.object({
	name: yup
		.string()
		.matches(/^[a-zA-Z]+$/, "Username must contain only letters")
		.required("Username is required"),
	email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
});

const userIdShema = yup
	.number()
	.positive("Must be positive")
	.integer("Must be integer");

const userValidate = async (req, res, next) => {
	try {
		await userShema.validate(req.body);
		res.status(201);
	} catch (err) {
		res.status(400).send({ error: err.message });
		return;
	}
	next();
};

const userIdValidate = async (req, res, next) => {
	try {
		await userIdShema.validate(req.params.userId);
	} catch (err) {
		res.status(400).send({ error: err.message });
		return;
	}

	next();
};

module.exports = { userValidate, userIdValidate };
