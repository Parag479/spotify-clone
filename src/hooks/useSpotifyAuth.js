import { useEffect } from 'react';

export const useSpotifyAuth = () => {
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('spotify_token');
      if (!token) return;
      // Add token expiration logic if needed
    };
    checkToken();
    const interval = setInterval(checkToken, 60000);
    return () => clearInterval(interval);
  }, []);
};