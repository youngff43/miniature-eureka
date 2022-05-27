// requirements 
const router = require("express").Router();
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
//uuidv4();  ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class saveNote {
    write(note) {
        return writeNote ('db/db.json', JSON.stringify(note));
    }

    read() {
        return readNote('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then(notes => {
            let parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parseNotes = [];
            }
            return parseNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('You must fill out either the title or the text area.');
        }
        const newNote = { title, text, id: uuidv4() };

        return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote);
    }

    deleteNote(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        then(filteredNotes => this.write(filteredNotes));
    }
}

//GET
router.get("/notes", function (req, res) {
    saveNote
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

//POST
router.post("/notes", (req, res) => {
    saveNote
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

module.exports = router; 
