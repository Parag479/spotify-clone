import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractTokenFromHash } from '../services/spotify';

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = extractTokenFromHash();
      if (!token) throw new Error('No token found');
      
      localStorage.setItem('spotify_token', token);
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/login');
    }
  }, [navigate]);

  return <div>Processing login...</div>;
}