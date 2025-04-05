import React, { useEffect, useState, useContext } from 'react';
import { fetchFeaturedPlaylists } from '../../../utils/spotifyApi';
import { SpotifyContext } from '../../../context/SpotifyContext';
import Heading from '../../../components/UI/Heading';
import './FeaturedPlaylists.css';

export default function FeaturedPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(SpotifyContext);

  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    fetchFeaturedPlaylists(token)
      .then((data) => setPlaylists(data))
      .catch((err) => setError(err.message));
  }, [token]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (playlists.length === 0) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <section id="featured-playlists" className="section">
      <Heading variant="primary">Featured Playlists</Heading>
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