const app = require(`express`).Router();
const path = require(`path`);

app.get(`/`, (req, res) =>
    res.status(200).sendFile(path.join(__dirname, `/public/index.html`))
);

app.get(`/notes`, (req, res) =>
    res.status(200).sendFile(path.join(__dirname, `../public/notes.html`))
);

module.exports = app;