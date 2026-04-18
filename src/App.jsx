import { createHashRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import PokemonDetail from './pages/PokemonDetail';
import About from './pages/About';

// A Layout component to show the Navbar on every page
const Layout = () => (
  <>
    <nav style={{ padding: '1rem', background: '#ef5350', color: 'white' }}>
      <Link to="/" style={{ margin: '10px', color: 'white' }}>Pokedex</Link>
      <Link to="/about" style={{ margin: '10px', color: 'white' }}>About</Link>
    </nav>
    <Outlet /> 
  </>
);

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Pokedex /> },
      { path: "/pokemon/:name", element: <PokemonDetail /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}