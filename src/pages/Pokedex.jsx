import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(data => setPokemonList(data.results))
      .catch(error => console.error("Error fetching list:", error));
  }, [offset]);

  // Main Grid Styles to wrap the cards
  const pokedexContainerStyle = {
    padding: '2rem',
    fontFamily: 'sans-serif',
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '2rem',
  };

  // Modern pagination buttons
  const paginationButtonStyle = {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: '#ff5350',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  };

  return (
    <div style={pokedexContainerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Pokédex</h1>
      
      <div style={gridStyle}>
        {pokemonList.map((p, index) => (
          <PokemonCard 
            key={p.name} 
            name={p.name} 
            number={offset + index + 1} 
          />
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          disabled={offset === 0} 
          onClick={() => setOffset(offset - limit)}
          style={{...paginationButtonStyle, opacity: offset === 0 ? 0.5 : 1}}
        >
          &lt; Prev
        </button>
        <span style={{fontWeight: 'bold'}}>
            {offset / limit + 1}
        </span>
        <button 
          onClick={() => setOffset(offset + limit)}
          style={paginationButtonStyle}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}