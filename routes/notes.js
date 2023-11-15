const path = require('path')
const notes = require ('express').Router()
const db = path.join(__dirname, '../db/db.json')
const {readAndAppend} = require('../helpers/fsUtils');
const fs = require('fs')
const uuid = require('../helpers/uuid')

notes.get('/', (req, res) => {
    console.log('landed on notes')
    res.sendFile(db)
})

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