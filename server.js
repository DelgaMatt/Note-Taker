const express = require(`express`);
const fs = require(`fs`);
const path = require('path');
const database = require(`./db/db.json`);

const generateUniqueId = require('./utils/generateUniqueId');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static(`public`));

//middleware
//It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Foundational routes
//------------------------------

app.get(`/`, (req, res) =>
    res.status(200).sendFile(path.join(__dirname, `/public/index.html`))
);

app.get(`/notes`, (req, res) =>
    res.status(200).sendFile(path.join(__dirname, `/public/notes.html`))
);
//------------------------------

//API ROUTES
//------------------------------
app.route(`/api/notes`)
    .get(function (req, res) {
        console.log(`${req.method} request recieved for notes`);
        res.json(database);
    })

    .post(function (req, res) {
        res.json(`${req.method} request received to add a note`);
        const { title, text } = req.body;

        if (title && text) {
            const newNote = {
                title,
                text
            }
            fs.readFile(`./db/db.json`, `utf8`, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    //string -> JSON Object
                    const parsedNote = JSON.parse(data);
                    //new note -> 
                    database.push(newNote);
                    
                    res.json(`Note added successfully`);

                    fs.writeFile(`./db/db.json`, data, (err) => {

                    })
                }
            })
        } else {
            res.error(`There's an error in adding your note.`);
            console.log(err);
        };
        // should receive a new note to save on the request body, add it to the db.json file,
        // and then return the new note to the client. 
    });
//-------------------------------

app.delete(`api/notes/:id`, (req, res) => {
    // should receive a query parameter containing the id of a note to delete. 
    // In order to delete a note, you'll need to read all notes from the db.json file, 
    // remove the note with the given id property, and then rewrite the notes to the db.json file.
    const { id } = req.params;
    const { note } = req.body;

    if (!note) {
        res.status(4).send({ message: `Please enter a note to be saved` })
    }
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);