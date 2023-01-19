const app = require(`express`).Router();
const path = require(`path`);
const database = require(`../db/db.json`);
const { writeToFile, readAndAppend } = require("../helpers/fsUtils");
const generateUniqueId = require('generate-unique-id');


app.route(`/notes`)
    .get(function (req, res) {
        console.log(`${req.method} request recieved for notes`);
        res.json(database);
    })

    .post(function (req, res) {
        console.log(`${req.method} request recieved for notes`);
        const { title, text } = req.body;
        
        if (title && text) {
            const newNote = {
                title,
                text,
                id: generateUniqueId()
            }
            
            database.push(newNote);
            readAndAppend(newNote, `./db/db.json`);
            res.json(`${req.method} request received to add a note`);
        } else {
            res.send(`There's an error in adding your note.`);
        };
    })

app.delete(`/notes/:id`, (req, res) => {
    console.log(`${req.method} request recieved for notes`);
    const { id } = req.params;
    const noteIndex = database.findIndex(notes => notes.id === id);

    database.splice(noteIndex, 1);
    writeToFile(`./db/db.json`, database);

    res.json(`${req.method} request received to delete a note`);
})

    module.exports = app;