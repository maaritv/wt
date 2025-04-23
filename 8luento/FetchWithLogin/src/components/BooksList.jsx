import React from 'react';
import { useState, useEffect, useContext } from 'react'
import vuori from '../vuori.png';
import { BooksComponent } from './components';



const base_url = import.meta.env.VITE_API_URL

export function BooksList({ title}) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')


  function fetchData() {
    const url = `${base_url}/books`
    console.log(url)
    const config = {
      method: 'GET',
      credentials: "include"
    }
    fetch(url, config)
      .then(result => result.json())
      .then(json => {
        if (json.length > 0) {
          console.log(json)
          setBooks(json)
        }
        else {
          setMessage(`Ei kirjoja`)
        }
      })
      .catch(error => {
        if (error.status === 401) {
          setAuthenticated(false)
        }
        console.log(error)
        setMessage("Virhe kirjoja haettaessa")
      })
      .finally(setLoading(false))
  }

  useEffect(() => {
    fetchData();
  }, []);

  //console.log(books)

  if (loading) {
    return (<div>Ladataan listaa kirjoista. <br /><img src={vuori} alt="kirjat tulossa" /></div>)
  }
  else {
    return (<div><p>{message}</p>
      {books.length > 0 ? <BooksComponent title={title} books={books}/> : <div>Kirjastossa ei ole kirjoja</div>}
    </div>)
  }
}



