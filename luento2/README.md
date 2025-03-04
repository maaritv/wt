# Web-palvelindemo #

* Käyttää express-palvelinta, joka asennetaan: npm install express
* index.js on Web-palvelin, joka:
   - Kuuntelee vain localhost-porttia, eikä avaa palvelinta kuuntelemaan varsinaisesti TCP-IP-yhteydenottoja tietoverkosta.
   - Lukee hakemistoja tietokoneesta, älä siis kehittäessäsi käynnistä Web-palvelinta käyttäjänä, jolla on oikeus lukea omia salaisia tiedostojasi.
   - Älä talleta salasanoja hakemistoihin, joiden tiedostoja Web-palvelimella on oikeus palvella käyttäjille.
   - Älä laita salasanoja hakemistoihin, jotka aiot siirtää versionhallintaan, koska tällöin myös salasanatiedostot päätyvät versionhallintaan, jossa ne eivät enää ole käyttäjähallinnan piirissä, vaan josta ne näkevät henkilöt, jotka muuten niitä eivät näkisi.



