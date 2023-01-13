const express = require(`express`);
const fs = require(`fs`);
const path = require('path');
const database = require(`./db/db.json`);
const generateUniqueId = require('./utils/generateUniqueId');
const apiRoutes = require(`./routes/noteRoutes`);
const home = require(`./routes/index`);
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(`public`));

//middleware
//It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use(`/`, home);

// //Foundational routes
// //------------------------------
// app.get(`/`, (req, res) =>
//     res.status(200).sendFile(path.join(__dirname, `/public/index.html`))
// );

// app.get(`/notes`, (req, res) =>
//     res.status(200).sendFile(path.join(__dirname, `/public/notes.html`))
// );
// //------------------------------

// app.delete(`api/notes/:id`, (req, res) => {
//     // should receive a query parameter containing the id of a note to delete. 
//     // In order to delete a note, you'll need to read all notes from the db.json file, 
//     // remove the note with the given id property, and then rewrite the notes to the db.json file.
//     const { id } = req.params;
//     const { note } = req.body;

//     if (!note) {
//         res.status(4).send({ message: `Please enter a note to be saved` })
//     }
// });

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);