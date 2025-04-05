import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpotifyProvider } from './context/SpotifyContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Callback from './pages/Callback';

function App() {
  return (
    <SpotifyProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </SpotifyProvider>
  );
}

export default App;