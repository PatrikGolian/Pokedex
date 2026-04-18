import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PokemonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [name]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{data.name.toUpperCase()}</h1>
      <img src={data.sprites.front_default} alt={data.name} style={{ width: '150px' }} />
      
      <h3>Stats</h3>
      <ul>
        {data.stats.map(s => (
          <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
        ))}
      </ul>
      <p><strong>Height:</strong> {data.height} | <strong>Weight:</strong> {data.weight}</p>
    </div>
  );
}