// requirements 
const router = require("express").Router();
const noteFunctions = require('../db/noteFunctions');

//GET the notes 
router.get('/notes', function (req, res) {
    noteFunctions
        .retreiveNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

//POST new notes 
router.post('/notes', (req, res) => {
    noteFunctions
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

//DELETE notes 
router.delete('/notes/:id', function (req, res) {
    noteFunctions
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});

module.exports = router; 
