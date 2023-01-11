const fs = require(`fs`);
const express = require(`express`);
const path = require('path');
const PORT = 3001;

const app = express();

// is a built in middleware function in Express starting from v4.16.0. 
//It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());
//--->

app.use(express.static(`public`));


app.get(`/`, (req, res) => 
    res.sendFile(path.join(__dirname, `/public/index.html`))
);

app.get(`/notes`, (req, res) => 
    res.sendFile(path.join(__dirname, `/public/notes.html`))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);