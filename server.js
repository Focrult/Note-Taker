//Declarations
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
console.log(`listening on port ${PORT}`);
})
