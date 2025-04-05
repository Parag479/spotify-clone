import React, { createContext, useState, useEffect } from 'react';

export const SpotifyContext = createContext();

export function SpotifyProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('spotify_token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError('No token found. Please log in.');
    }
    setLoading(false);
  }, []);

  return (
    <SpotifyContext.Provider value={{ token, loading, error }}>
      {children}
    </SpotifyContext.Provider>
  );
}