let treasureIslandActor = [
	{
		id: 1,
		name: "Jim Hawkins",
		email: "Main protagonist",
		description:
			"A young boy who finds a treasure map and embarks on an adventure.",
	},
	{
		id: 2,
		name: "Long John Silver",
		email: "Antagonist",
		description:
			"A cunning and charismatic pirate who serves as the ship's cook.",
	},
	{
		id: 3,
		name: "Dr. Livesey",
		email: "Doctor",
		description:
			"A local physician and magistrate who helps organize the voyage.",
	},
	{
		id: 4,
		name: "Squire Trelawney",
		email: "Financier",
		description: "A wealthy landowner who finances the treasure hunt.",
	},
];

module.exports = {
	getUserList: () => {
		return treasureIslandActor;
	},

	getCharacter: (id) => {
		const character = treasureIslandActor.find((user) => user.id == id);
		return character;
	},
	deleteUser: (id) => {
		const filterActor = treasureIslandActor.filter(
			(user) => user.id !== +id
		);
		treasureIslandActor = filterActor;
	},
	addCharacter: (objectCharacter) => {
		objectCharacter.id = treasureIslandActor.length + 1;
		treasureIslandActor.push(objectCharacter);
	},
};
