// add dependencies
const path = require('path');
const fs = require('fs');
const express = require('express');
const { get } = require('http');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const {v4:uuidv4} = require('uuid')

const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => {
    getNotes().then(data => res.json(data)).catch(err => res.status(500).json(err));
    
    
})
app.post('/api/notes', (req, res) => {
    getNotes().then(data => { 
        const newArray = [...data, {title: req.body.title, text: req.body.text, id: uuidv4()}]
        writeFile("db/db.json", JSON.stringify(newArray, null, 2))
    }).then( () => res.json({msg:"okay"}))
})

function getNotes() {
    return readFile("db/db.json", "utf8").then(rawNotes => {
        let parseNotes = [].concat(JSON.parse(rawNotes));
        return parseNotes
    }); 
}
app.listen(PORT, () => console.log('listening on port' + PORT));