const path = require('path')
const notes = require ('express').Router()
const db = path.join(__dirname, '../db/db.json')
const {readAndAppend} = require('../helpers/fsUtils');
const fs = require('fs')

notes.get('/', (req, res) => {
    console.log('landed on notes')
    res.sendFile(db)
})

notes.post('/', (req, res) => {
    readAndAppend(req.body, db)
    res.status(200).send("Good!")
})

notes.delete('/:title', (req, res) => {
    let notesData
    fs.readFile(db, (error, data) => {
        if (error)
        {
            console.error(error)
        }
        else
        {
            notesData = JSON.parse(data)      

            for (let note of notesData)
            {
                if (note.title === req.params.title)
                {
                    notesData.splice(notesData.indexOf(note), 1)
                    notesData = JSON.stringify(notesData, null, 4)
                    fs.writeFile(db, notesData, (error) => error ? console.error(error) : console.log("Success"))
                    res.status(200).send("Successfully deleted note")
                    return
                }
            }
        }        
    })    
})

module.exports = notes;