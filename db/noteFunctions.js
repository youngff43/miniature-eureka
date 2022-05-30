const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class noteFunctions {
    write(note) {
        return writeNote ('db/db.json', JSON.stringify(note));
    }

    read() {
        return readNote('db/db.json');
    }

    retreiveNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            } 
            return parsedNotes
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
        return this.retreiveNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new noteFunctions();