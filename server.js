// required  
const express = require('express');
const PORT = process.env.PORT || 3001; 
const app = express();

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });



 //http://localhost:3001/api/notes