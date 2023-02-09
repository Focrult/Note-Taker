//Declarations
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json');
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

//How to save db notes - use POST method
app.post('/api/notes', (req, res) => {
    const input = req.body;
    db.push(input);
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(db), (err) => {
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
});