const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path'); // Import the path module

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use path.join to create an absolute path
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.static('src'));

app.get('/', (req, res) => {
    res.send('Welcome to the home route');
});

app.post('/home/upload', upload.single('file'), (req, res) => {
    res.json(req.file);
    
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
