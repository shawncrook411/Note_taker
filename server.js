const express = require('express');
const path = require('path');

const api = require('./routes/index.js')

const app = express();

//Opens port on process.env.PORT if it exists for Heroku, otherwise 3001 if local host
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Specifies where to grab files from
app.use(express.static('public'));

//Sends /api requests to the /routes/index.js file/folder
app.use('/api', api);

//App is now live and listening at the PORT given
app.listen(PORT, () => 
    console.log(`Server listening at http://localhost:${PORT}`)
);