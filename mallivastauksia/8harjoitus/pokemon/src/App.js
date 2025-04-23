import React from 'react';
import { useState, useEffect } from 'react'


/**
 * Esimerkissä haetaan vain yhden Pokemonin tiedot 
 * eikä listaa kuten luennon esimerkeissä.  
 * @returns 
 */

export function App() {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const selectedId = 30

  useEffect(() => {
    fetchData(selectedId)
  }, []);


  function fetchData(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    console.log(url)
    fetch(url)
      .then(result => result.json())
      .then(json => {
        console.log(json)
        if (json) {
          console.log(json)
          setPokemon(json)
        }
        else {
          setMessage(`Ei löytynyt Pokemonia.`)
        }
      })
      .catch(error => {
        console.log(error)
        setMessage("Virhe tietoja haettaessa " + error)
      })
      .finally(setLoading(false))
  }

  //console.log(pokemons)

  if (loading) {
    return (<div>Ladataan Pokemonin tietoja.</div>)
  }
  else {
    return (<div><p>{message}</p>
      {pokemon ? <PokemonComponent pokemon={pokemon} /> : ""}
    </div>)
  }
}

function PokemonAbilities({pokemon}){
  return(<div>
    <h2>Abilities</h2>
    <ul>{pokemon.abilities.map((ability, index) => <li key={index}>{ability.ability.name}</li>)}</ul>
    </div>)
}


function PokemonComponent({ pokemon }) {

  return (<div style={{margin: 30, fontSize: 14}}><h1>Pokemonin {pokemon.name} tiedot</h1>
    <p>Base experience {pokemon.base_experience}</p>
    <PokemonImage pokemon={pokemon} />
    <PokemonAbilities pokemon={pokemon}/></div>)
 }

function PokemonImage({ pokemon }) {
  return (<img src={pokemon.sprites.back_default} alt={pokemon.forms.name} />)
}

export default App;

