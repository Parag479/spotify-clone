import React, { useEffect } from 'react';
import { getAuthUrl } from '../utils/auth';

export default function Login() {
  useEffect(() => {
    const authUrl = getAuthUrl();
    console.log('Auth URL:', authUrl); // Debugging: Log the auth URL
    window.location.href = authUrl; // Redirect to Spotify login
  }, []);

  return (
    <div>
      <h1>Redirecting to Spotify...</h1>
    </div>
  );
}