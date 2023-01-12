const express = require(`express`);
const noteRoutes = require(``);

const app = express();

app.use(`/notes`, noteRoutes);

module.exports = app;