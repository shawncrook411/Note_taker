const express = require('express');
const path = require('path');

const api = require('./routes/index.js')

const app = express();

const PORT = 3001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.use('/api', api);

app.listen(PORT, () => 
    console.log(`Server listening at http://localhost:${PORT}`)
);