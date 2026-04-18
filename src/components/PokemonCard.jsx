import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple color map for types (add more as needed)
const TYPE_COLORS = {
  fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0'
};

export default function PokemonCard({ name, number }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch individual data for each card (needed for type & official artwork)
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(error => console.error(`Error fetching ${name}:`, error));
  }, [name]);

  if (!data) return <p>Loading...</p>;

  // Get the primary type for background color
  const primaryType = data.types[0]?.type.name;
  const cardColor = TYPE_COLORS[primaryType] || TYPE_COLORS.default;

  // Modern styled components (inline for simplicity)
  const cardStyle = {
    backgroundColor: cardColor,
    borderRadius: '15px', // Modern rounded corners
    color: 'white',
    width: '240px',
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1.2rem',
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.2s', // Add hover effect
    overflow: 'hidden',
  };

  const numberStyle = {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    opacity: 0.8,
  };

  const nameStyle = {
    fontSize: '1.4rem',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    margin: '0.2rem 0',
  };

  const spriteStyle = {
    width: '60px',
    height: '60px',
    position: 'absolute',
    right: '15px',
    top: '30px',
    filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.3))' // Modern look
  };

  return (
    <div 
      style={cardStyle} 
      className="pokemon-card" // Added class for easy hover styling in App.css if needed
      onClick={() => navigate(`/pokemon/${name}`)}
    >
      <div style={{zIndex: 1}}>
        <p style={numberStyle}>#{number}</p>
        <h3 style={nameStyle}>{name}</h3>
      </div>
      
      {/* 1. Official High-Res Artwork (much nicer than default sprites!) */}
      <img 
        src={data.sprites.other['official-artwork'].front_default} 
        alt={name} 
        style={spriteStyle}
      />
    </div>
  );
}