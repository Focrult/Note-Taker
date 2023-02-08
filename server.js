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