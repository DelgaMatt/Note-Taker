const fs = require(`fs`);
const express = require(`express`);
const path = require('path');
const notesData = require(`./db/db.json`);
const generateUniqueId = require('./utils/generateUniqueId');

const PORT = 3001;

const app = express();

// is a built in middleware function in Express starting from v4.16.0. 
//It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());
//--->

app.use(express.static(`public`));

//creating an html path for index.html
app.get(`/`, (req, res) => 
    res.sendFile(path.join(__dirname, `/public/index.html`))
);

//creating an html path for notes.html
app.get(`/notes`, (req, res) => 
    res.sendFile(path.join(__dirname, `/public/notes.html`))
);

//creating an API route for notes.html
app.get('/api/notes', (req, res) => res.json(notesData));

//post request to add a note
app.post(`/api/notes`, (req, res) => {
    res.json(`${req.method} request received to add a review`);
    // should receive a new note to save on the request body, add it to the db.json file,
    // and then return the new note to the client. 
    // You'll need to find a way to give each note a unique id when it's saved 
    // (look into npm packages that could do this for you).
})

app.delete(`api/notes/:id`, (req, res) => {
    // should receive a query parameter containing the id of a note to delete. 
    // In order to delete a note, you'll need to read all notes from the db.json file, 
    // remove the note with the given id property, and then rewrite the notes to the db.json file.
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);