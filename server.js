//Declarations
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

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