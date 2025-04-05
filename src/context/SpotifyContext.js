import { createContext, useState, useEffect } from 'react';
import { verifyToken } from '../services/spotifyAPI';

export const SpotifyContext = createContext(null);

export function SpotifyProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = localStorage.getItem('spotify_token');
        const tokenTimestamp = localStorage.getItem('spotify_token_timestamp');
        
        if (!storedToken) {
          setError('No token found. Please log in.');
          setToken(null);
          return;
        }

        // Check if token is expired (1 hour)
        const isExpired = Date.now() - Number(tokenTimestamp) > 3600 * 1000;
        if (isExpired) {
          localStorage.removeItem('spotify_token');
          localStorage.removeItem('spotify_token_timestamp');
          setError('Session expired. Please log in again.');
          setToken(null);
          return;
        }

        // Verify token with Spotify API
        const isValid = await verifyToken(storedToken);
        if (!isValid) {
          localStorage.removeItem('spotify_token');
          localStorage.removeItem('spotify_token_timestamp');
          setError('Invalid token. Please log in again.');
          setToken(null);
          return;
        }

        setToken(storedToken);
        setError(null);
      } catch (err) {
        setError('Authentication error. Please log in again.');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = (newToken) => {
    localStorage.setItem('spotify_token', newToken);
    localStorage.setItem('spotify_token_timestamp', Date.now());
    setToken(newToken);
    setError(null);
  };

  const logout = () => {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_timestamp');
    setToken(null);
    setError(null);
  };

  return (
    <SpotifyContext.Provider value={{ token, loading, error, login, logout }}>
      {children}
    </SpotifyContext.Provider>
  );
}