const path = require('path')
const notes = require ('express').Router()

//Pathname and file need to be joined
const db = path.join(__dirname, '../db/db.json')

//Used for the readAndAppend function, allows for easier use to append JSON data
const {readAndAppend} = require('../helpers/fsUtils');

//Used to readFile and writeFile for delete route
const fs = require('fs')

//Used to generate unique ID's for the notes
const uuid = require('../helpers/uuid')

//Basic get and retive route. Used to get the list of notes from db.json
notes.get('/', (req, res) => {
    console.log('landed on notes')
    res.sendFile(db)
})

//Creates an object from the body request, and appends it to the db.json file
notes.post('/', (req, res) => {
    if (req.body.title && req.body.text)
    {   
        let object = {
        title : req.body.title,
        text : req.body.text,
        id : uuid(),
        }
        
        readAndAppend(object, db)
        res.status(200).send("Good!")
    }
})

//Reads the db file, and iterates through it. If a note exists with the same ID as the request, it is spliced off and re-written
notes.delete('/:id', (req, res) => {
    let notesData
    fs.readFile(db, (error, data) => {
        if (error)
        {
            console.error(error)
            res.status(400)
        }
        else
        {
            notesData = JSON.parse(data)      

            for (let note of notesData)
            {
                if (note.id === req.params.id)
                {
                    notesData.splice(notesData.indexOf(note), 1)
                    notesData = JSON.stringify(notesData, null, 4)
                    fs.writeFile(db, notesData, (error) => error ? console.error(error) : console.log("Success"))
                    res.status(200).send("Successfully deleted note")
                    return
                }
            }
            res.status(404).send("Note title doesn't exist")
            return
        }        
    })    
})

module.exports = notes;