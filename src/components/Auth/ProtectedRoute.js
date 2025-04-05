import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SpotifyContext } from '../../context/SpotifyContext';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(SpotifyContext);
  return token ? children : <Navigate to="/login" replace />;
}