const express = require('express')
const Note = require('../models/note')
const router = express.Router()

router
  .get('/', async (req, res) => {
    try {
      const notes = await Note.getAllNotes()
      res.send(notes)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  //for createNote function in models/note.js
  .post('/create', async (req, res) => {
    try {
      let note = await Note.createNote(req.body)
      res.send({...note})
    } 
    catch (err) {
      res.status(401).send({message: err.message})
    }
  })

  //for getNote function in models/note.js
  .post('/getNote', async (req, res) => {
    try {
      const note = await Note.getNote(req.body)
      res.send(note)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  //for getAllUserNotes function in models/note.js
  .post('/getMyNotes', async (req, res) => {
    try {
      const notes = await Note.getAllUserNotes(req.body)
      res.send({...notes})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  //for editNote function in models/note.js
  .put('/edit', async (req, res) => {
    try {
      let note = await Note.editNote(req.body)
      res.send({...note})
    } 
    catch (err) {
      res.status(401).send({message: err.message})
    }
  })

  //for deleteNote function in models/note.js
  .delete('/delete', async (req, res) => {
    try {
      let note = await Note.deleteNote(req.body)
      res.send({success: "Note has been deleted!"})
    } 
    catch (err) {
      res.status(401).send({message: err.message})
    }
  })
  module.exports = router;