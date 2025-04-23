# Node.js taustajärjestelmä express-web palvelimella


### Ajetaan paikallisessa ympäristössä

Muista ensin siirtyä terminaalilla hakemistoon ja ajaa _npm install_

## node ./index.js

- 4 kontrolleria (reittiä)
- palvelukerros
- syötteiden validointi ja puhdistus
- models - datamalli objektit ja tiedon tallennus MongoDB-tietokantaan.
- tunnistautuminen ja HTTP-only evästeen asetus selaimeen
- JWT-tokenin verifiointi
- DTO-objekti kirjoille

## Data talletetaan MongoDB tietokantaan.

## Tämä projekti voi sisältää huolimattomuusvirheitä (bugeja), joten 
älä käytä koodia sellaisenaan tuotantokäytössä, vaan testaa se ensin 
kunnolla.

## Se sisältää myös seuraavat tiedetyt virheet, joita älä kopio omaan ratkaisuusi.

- Turvallisuuskriittisen tiedon logitusta (tokenit)
- Virheenkäsittely ei ole täydellinen.
ällä yksikkötestejä
