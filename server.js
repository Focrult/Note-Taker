//Declarations
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
console.log(`listening on port ${PORT}`);
});

//fixing get betweem htmls
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//db notes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) return res.status(500).send(err);

        try {
            const savedNotes = JSON.parse(data);
            return res.json(savedNotes);
        } catch (err) {
            return res.status(500).send(err);
        }
    });
});

//use POST method
app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) return res.status(500).send(err);

        try {
            const savedNotes = JSON.parse(data);
            const newNote = {
                id: savedNotes.length + 1,
                ...req.body
            };
            savedNotes.push(newNote);
            fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(savedNotes), (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error saving data to file." });
                }
                return res.json({ //list properties in the response JSON object
                isError: false,
                message: "Note saved successfully",
                PORT: PORT,
                success: true,
                status: 200
                });
            });
        } catch (err) {
            return res.status(500).send(err);
        }
    });
});