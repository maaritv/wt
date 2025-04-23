import './App.css'
import { LoginForm } from './components/LoginForm'
import { BooksList } from './components/BooksList'
import { MyBooksList } from './components/MyBooksList'
import { useState, useEffect } from 'react'



/**
 * Käynnistä sovellus paikallisesti komennolla npx vite
 */

const base_url = import.meta.env.VITE_API_URL

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [statusText, setStatusText] = useState('')

  function logout() {
    fetch(`${base_url}/login/logout`, {
      method: "POST", // Tai GET, jos backend tukee sitä
      credentials: "include" // Pakollinen, jotta evästeet välittyvät
    })
      .then((res) => {
        if (res.ok) {
          setStatusText('Uloskirjautuminen onnistui')
          setAuthenticated(false)
        } else {
          setStatusText('Uloskirjautuminen epäonnistui.');
        }
      })
      .catch((err) => setStatusText('Virhe uloskirjautumisessa'))
  }

  return (
    <div className="App">
      {!authenticated ? <LoginForm setAuthenticated={setAuthenticated} setStatusText={setStatusText}/> :
        <MyBooksList title="My Books" logout={logout} setAuthenticated={setAuthenticated}/>}
        <BooksList title="All books in the library"/>
        <div>{statusText}</div>
    </div>
  )
}