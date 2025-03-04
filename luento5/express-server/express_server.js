const express = require('express');
const app = express();
const PORT = 3000;


/**
   Asenna web-palvelinkirjasto express: npm install express
**/


app.get('/hei', (req, res) => {

    const helloFunction=sayHi
    res.send(`
        <html>
          ${createHeader()}
          ${createBodyWith(helloFunction)} 
	</html>
    `);
});

app.get('/moi', (req, res) => {
    const helloFunction=sayMoi
    res.send(`
          <!DOCTYPE html>
          <html lang="en">
          ${createHeader()}
          ${createBodyWith(helloFunction)}
        </html>
    `);
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

//sayHi-funktio suoritetaan Web-palvelimessa, se palauttaa tekstin: function addText() { jne
//joka on funktio, joka suoritetaan Web-selaimessa. 
function sayHi(){
   return `function addText() {
             document.getElementById('output').innerText = 'Hello World';
           }`
}

//sayMoi-funktio suoritetaan Web-palvelimessa, se palauttaa tekstin: function addText() { jne
//joka on funktio, joka suoritetaan Web-selaimessa. 
function sayMoi(){
  return `function addText() {
             document.getElementById('output').innerText = 'Moi maailma';
           }`
}

//Luo HTML-tekstin
function createHeader(){
   return `<head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hello World App</title>
        </head>`
}

function createBodyWith(sayIt){
    return `<body>
            <h1>Welcome!</h1>
            <button onclick="addText()">Click Me</button>
            <div id="output"></div>
            <script>
                ${sayIt()} 
            </script>
        </body>`

}
