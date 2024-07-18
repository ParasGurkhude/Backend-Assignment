const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path');

const server = express()

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
server.use(morgan('combined', { stream: accessLogStream }))


// Routes;
server.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

server.get('/get-users', (req, res) => {
    res.status(200).json({ users: ['Paras', 'Shivam', 'Rjun'] });   
});

server.post('/add-user', (req, res) => {
    
    res.status(201).json({ message: 'User added successfully' });
});

server.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.status(201).json({ message: `User ${userId} updated successfully` });
});

server.delete('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} deleted successfully`);
});

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000/`);
})