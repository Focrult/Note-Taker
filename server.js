//Declarations
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//use GET method
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
//db notes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) {
      // Return a 500 status code and send the error message in the response if an error occurs while reading the file
      return res.status(500).send(err);
    }

    try {
      const savedNotes = JSON.parse(data);
      return res.json(savedNotes);
    } catch (err) {
      // Return a 500 status code and send the error message in the response if an error occurs while parsing the file contents
      return res.status(500).send(err);
    }
  });
});

app.get('*', (req, res) => {
  res.redirect('/');
})
//use POST method
app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
        if (err) return res.status(500).send(err);

        try {
            const savedNotes = JSON.parse(data);
            const newNote = { id: savedNotes.length + 1, title: req.body[0].title, text: req.body[0].text };
            savedNotes.push(newNote);
            fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(savedNotes), (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error saving data to file." });
                }
                return res.json({ message: "Note saved successfully" });
            });
        } catch (err) {
            return res.status(500).send(err);
        }
    });
});