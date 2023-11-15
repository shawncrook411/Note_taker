const path = require('path')
const notes = require ('express').Router()
const db = path.join(__dirname, '../db/db.json')
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs')


notes.get('/', (req, res) => {
    console.log('landed on notes')
    res.sendFile(db)
})

notes.post('/', (req, res) => {
    readAndAppend(req.body, db)
    res.status(200).send("Good!")
})


module.exports = notes;