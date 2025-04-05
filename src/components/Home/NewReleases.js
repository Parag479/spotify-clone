import React, { useEffect, useState } from 'react';
import { fetchNewReleases } from '../../utils/spotifyApi';
import './NewReleases.css';

export default function NewReleases() {
  const [newReleases, setNewReleases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    fetchNewReleases(token)
      .then((data) => setNewReleases(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (newReleases.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section className="section">
      <h2 className="section-title">Released This Week</h2>
      <div className="grid-container">
        {newReleases.map((album) => (
          <div key={album.id} className="card">
            <img src={album.images[0].url} alt={album.name} />
            <h3>{album.name}</h3>
            <p>{album.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}