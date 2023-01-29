// Import express package
const express = require("express");
const path = require("path");
const fs = require("fs");

// Helper method for generating unique ids
const uuid = require('./z-helpers/uuid');

// Require the JSON file and assign it to a variable called `dbData`
const dbData = require("./db/note.json");


const PORT = process.env.PORT || 8080;



// Initialize our app variable by setting it to the value of express()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// not needed i think
// app.get("/", (req, res) => res.send("Visit http://localhost:3001/api"));

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get("/api", (req, res) => res.json(dbData));

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get("/api/notes", (req, res) => res.json(dbData));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// POST request for notes
// app.post('/api/notes', (req, res) => {
//   // Inform the client that their POST request was received
//   res.json(`${req.method} request received to add a notes`);

//   // Log our request to the terminal
//   console.info(`${req.method} request received to add a notes`);
// });

// POST request to add a text
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text ) {
    // Variable for the object we will save
    const newNote = {
			title,
			text,
			//   username,
			//   upvotes: Math.floor(Math.random() * 100),
			notes_id: uuid(),
		};

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});





































// port listen
app.listen(PORT, () =>
	console.log(`Example app listening at http://localhost:${PORT}`)
);
