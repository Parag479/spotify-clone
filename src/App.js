import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getTokenFromUrl, isTokenExpired, saveToken } from './utils/auth';
import { SpotifyProvider } from './context/SpotifyContext';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    const hash = getTokenFromUrl();
    const token = hash.access_token;

    if (token) {
      saveToken(token);
      window.location.hash = ''; // Clear the hash from the URL
    } else if (isTokenExpired()) {
      window.location.href = '/login'; // Redirect to login
    }
  }, []);

  return (
    <SpotifyProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </SpotifyProvider>
  );
}

export default App;