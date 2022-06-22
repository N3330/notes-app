// add dependencies
const path = require('path');
const fs = require('fs');
const express = require('express');



const PORT = process.env.PORT || 3001;


const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => {
    
})

app.listen(PORT);