import React, { useState } from 'react';




export function LoginForm({ setAuthenticated, setStatusText }) {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function login(evt) {
    evt.preventDefault();
    setLoading(true)
    // Prepare login credentials in JSON format
    const credentials = {
      username: username,
      password: password
    };

    /**
     * Server in codesandbox.io:
     * https://codesandbox.io/p/devbox/booksbackendwithdb-v64gdm
     */

    const base_url = import.meta.env.VITE_API_URL

    const url = `${base_url}/login`;
    //ei ole hyvä käytäntö logata tunnuksia, ne voivat
    //joutua siten sivullisten tietoon.
    //console.log(credentials)
    fetch(url, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    }).then(response => response.json())
      .then(json => {
        setStatusText("Sisäänkirjautuminen onnistui")
        setAuthenticated(true)
      })
      .catch(error => {
        setStatusText('Sisäänkirjautuminen epäonnistui')
      })
      .finally(setLoading(false))
  }


  return (<div>
    <h2>Toteutettu Login, jossa JWT auth token asetetaan evästeeseen palvelimella. Tässä tokenia ei siis lueta otsikkotiedoista tai vastauksen body-osuudesta.</h2>
    {loading ? "Logging in" : ""}
    <form onSubmit={login}>
      <label>
        Username:
        <input
          type="text"
          minLength="3"
          maxLength="50"
          placeholder="ville"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          minLength="5"
          placeholder="ville"
          required
          maxLength="500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  </div>)
}

export default LoginForm;
