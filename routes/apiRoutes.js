// requirements 
const router = require("express").Router();
const saveNote = require('../db/noteFunctions.js');

//GET the notes 
router.get('/notes', function (req, res) {
    saveNote
        .retrieveNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

//POST new notes 
router.post('/notes', (req, res) => {
    saveNote
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

//DELETE notes 
router.delete('/notes/:id', function (req, res) {
    saveNote
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});

module.exports = router; 
