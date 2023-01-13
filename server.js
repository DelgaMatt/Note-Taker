const express = require(`express`);
const fs = require(`fs`);
const path = require('path');
const database = require(`./db/db.json`);
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

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);