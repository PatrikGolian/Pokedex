import { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  const [topHeight, setTopHeight] = useState([]);
  const [topWeight, setTopWeight] = useState([]);
  const [loading, setLoading] = useState(true);

  const randomFacts = [
    "Pikachu's name is a combination of the Japanese onomatopoeia for spark (pika) and the sound a mouse makes (chu).",
    "Snorlax was inspired by a real-life Game Freak staff member, Koji Nishino.",
    "The Pokéball was invented in the Johto region hundreds of years ago using Apricorns.",
    "Azurill is the only Pokémon that has a chance to change its gender when it evolves."
  ];

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const all = res.data.results;

        const detailed = await Promise.all(all.map(pokemon => axios.get(pokemon.url)));
        const data = detailed.map(d => d.data);

        setTopHeight([...data].sort((a, b) => b.height - a.height).slice(0, 5));
        setTopWeight([...data].sort((a, b) => b.weight - a.weight).slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about page data:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'sans-serif',
    lineHeight: '1.6',
    color: '#333'
  };

  const sectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  };

  const statItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee'
  };

  if (loading) return <div style={{textAlign:'center', padding: '50px'}}>Gathering Pokémon Data...</div>;

  return (
    <div style={containerStyle}>
      <h1 style={{color: '#ef5350'}}>About This Pokédex</h1>
      <p>
        This pokedex was built  using <strong>React</strong>, 
        <strong> Vite</strong>, and the <strong>PokéAPI</strong> as my 2nd Web Development Assignment.
      </p>

      <div style={sectionStyle}>
        <h2>✨ Fun Facts</h2>
        <ul style={{paddingLeft: '20px'}}>
          {randomFacts.map((fact, index) => (
            <li key={index} style={{marginBottom: '10px'}}>{fact}</li>
          ))}
        </ul>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        <div style={sectionStyle}>
          <h3 style={{color: '#4caf50'}}>📏 Tallest (Kanto)</h3>
          {topHeight.map(p => (
            <div key={p.id} style={statItemStyle}>
              <span style={{textTransform: 'capitalize'}}>{p.name}</span>
              <strong>{p.height / 10}m</strong>
            </div>
          ))}
        </div>

        <div style={sectionStyle}>
          <h3 style={{color: '#2196f3'}}>⚖️ Heaviest (Kanto)</h3>
          {topWeight.map(p => (
            <div key={p.id} style={statItemStyle}>
              <span style={{textTransform: 'capitalize'}}>{p.name}</span>
              <strong>{p.weight / 10}kg</strong>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '40px', fontSize: '0.9rem', opacity: 0.7}}>
        <p>Created as a Web Development Assignment</p>
        <p>© Patrik Golian and Richard Vegh 2026</p>
      </div>
    </div>
  );
};

export default About;