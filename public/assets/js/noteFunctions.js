const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
    write(note) {
        return writeNote ('./db/db', JSON.stringify(note));
    }

    read() {
        return readNote('./db/db', 'utf8');
    }

    async retrieveNotes() {
        const notes = await this.read();
        let parsedNotes;
        try {
            parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }
        return parsedNotes;
    }

    async addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('You must fill out either the title or the text area.');
        }
        const newNote = { title, text, id: uuidv4() };

        const notes = await this.retrieveNotes();
        const updatedNotes = [...notes, newNote];
        await this.write(updatedNotes);
        return newNote;
    }

    deleteNote(id) {
        return this.retreiveNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Save();