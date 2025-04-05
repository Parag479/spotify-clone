import React, { useEffect, useState } from 'react';
import { fetchFeaturedPlaylists } from '../../../utils/spotifyApi';
import './FeaturedPlaylists.css';

export default function FeaturedPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    fetchFeaturedPlaylists(token)
      .then((data) => setPlaylists(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (playlists.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section className="section">
      <h2 className="section-title">Featured Playlists</h2>
      <div className="grid-container">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="card">
            <img src={playlist.images[0].url} alt={playlist.name} />
            <h3>{playlist.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}