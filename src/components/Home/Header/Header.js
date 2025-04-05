import { useContext } from 'react';
import { SpotifyContext } from '../../../context/SpotifyContext';

export default function Header() {
  const { setToken } = useContext(SpotifyContext);
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('spotify_token');
  };

  return (
    <header>
      <h1>Spotify Clone</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
}