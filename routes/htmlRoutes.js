// requirements 
const path = require("path");
const router = require("express").Router();

// GET
router.get('/notes', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// send to home
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router; 