const express = require('express');

const notesRouter = require('./notes.js');

const app = express();

//From the /api landing page, then sends all requests to the notes.js page
app.use('/notes', notesRouter);

//This is an unused route incase the /notes isn't used. Used for testing
app.get('/', (req, res) => {
    console.log('routed to index.js')
    res.send('landed on api')
})


module.exports = app;