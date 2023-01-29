const note = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the note
note.get("/", (req, res) => {
	readFromFile("./db/note.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
note.post("/", (req, res) => {
	console.log(req.body);

	const { title, text } = req.body;

	if (req.body) {
		const newNote = {
			title,
			text,
			note_id: uuid(),
		};

		readAndAppend(newNote, "./db/note.json");
		res.json(`Note added successfully 🚀`);
	} else {
		res.error("Error in adding Note");
	}
});

module.exports = note;
