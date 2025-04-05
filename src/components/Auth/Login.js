import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpotifyContext } from '../../context/SpotifyContext';
import './Login.css';

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/callback';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played'
].join(' ');

export default function Login() {
  const navigate = useNavigate();
  const { token, login } = useContext(SpotifyContext);

  useEffect(() => {
    // If we already have a token, redirect to home
    if (token) {
      navigate('/');
    }

    // Check if we're returning from Spotify auth
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      login(accessToken);
      navigate('/');
    }
  }, [token, login, navigate]);

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Spotify Clone</h1>
        <p>Listen to your favorite music</p>
        <button className="login-button" onClick={handleLogin}>
          Login with Spotify
        </button>
      </div>
    </div>
  );
}
