const app = require(`express`).Router();
const path = require(`path`);
const database = require(`../db/db.json`);
const { writeToFile, readAndAppend } = require("../helpers/fsUtils");
const generateUniqueId = require('generate-unique-id');

//front end wanting to get something from the back end
app.route(`/notes`)
    .get(function (req, res) {
        console.log(`${req.method} request recieved for notes`);
        res.json(database);
    })

    // front end wanting to save something to the back end
    .post(function (req, res) {
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

    // .delete(`/notes/:id`, (req, res) => {
    //     // should receive a query parameter containing the id of a note to delete. 
    //     // In order to delete a note, you'll need to read all notes from the db.json file, 
    //     // remove the note with the given id property, and then rewrite the notes to the db.json file.
    // });

    module.exports = app;