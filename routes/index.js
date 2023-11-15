const express = require('express');

const notesRouter = require('./notes.js');

const app = express();

app.use('/notes', notesRouter);

app.get('/', (req, res) => {
    console.log('routed to index.js')
    res.send('landed on api')
})


module.exports = app;