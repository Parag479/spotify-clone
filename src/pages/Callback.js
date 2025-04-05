import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractTokenFromHash } from '../services/spotify';
import { SpotifyContext } from '../context/SpotifyContext';

export default function Callback() {
  const navigate = useNavigate();
  const { login } = useContext(SpotifyContext);

  useEffect(() => {
    try {
      const token = extractTokenFromHash();
      if (!token) throw new Error('No token found');
      
      login(token);
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/login');
    }
  }, [navigate, login]);

  return <div>Processing login...</div>;
}