import React from 'react';
import Table from 'react-bootstrap/Table';


/*
Komponentilla voidaan näyttää omat kirjat tai 
kaikki kirjat.
*/

export function BooksComponent({ title, books}) {
    return (<div>
      <h2>{title}</h2>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr><td>Nimi</td><td>Kirjailija</td><td>Julkaisuvuosi</td></tr>
          {books.map((book, index) =>
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.authorName}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>)
  }
