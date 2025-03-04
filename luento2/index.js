const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
//const WORKING_DIR = process.cwd();
const WORKING_DIR = '/Users/testi_suorittaja/Documents'

app.get('/', (req, res) => {
    fs.readdir(WORKING_DIR, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        const fileList = files.length ? files.join('<br>') : 'No files found.';
        res.send(`
            <html>
            <head><title>File List of test user code run by testuser</title></head>
            <body>
                <h1>Hello, World of other server!</h1>
                <h2>Files in directory: ${WORKING_DIR}</h2>
                <p>${fileList}</p>
            </body>
            </html>
        `);
    });
});

app.delete('/delete', (req, res) => {
    fs.readdir(WORKING_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ error: `Virhe: ${err.message} ${WORKING_DIR}` });
        }
        files.forEach(file => {
            const filePath = path.join(WORKING_DIR, file);
            if (fs.lstatSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        });
        res.json({ message: `All files deleted. ${WORKING_DIR}` });
    });
});

app.listen(3001, 'localhost', function() {
  console.log("Application running on localhost only (not open to external connections) at port 3001");
});

