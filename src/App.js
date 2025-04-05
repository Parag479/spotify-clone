import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SpotifyProvider } from './context/SpotifyContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Callback from './pages/Callback';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <SpotifyProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SpotifyProvider>
  );
}

export default App;