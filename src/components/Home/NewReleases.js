import React, { useEffect, useState, useContext } from 'react';
import { fetchNewReleases } from '../../utils/spotifyApi';
import { SpotifyContext } from '../../context/SpotifyContext';
import Heading from '../UI/Heading';
import './NewReleases.css';

export default function NewReleases() {
  const [newReleases, setNewReleases] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(SpotifyContext);

  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    fetchNewReleases(token)
      .then((data) => setNewReleases(data))
      .catch((err) => setError(err.message));
  }, [token]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (newReleases.length === 0) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <section id="new-releases" className="section">
      <Heading variant="primary">Released This Week</Heading>
      <div className="grid-container">
        {newReleases.map((album) => (
          <div key={album.id} className="card">
            <img src={album.images[0].url} alt={album.name} />
            <h3>{album.name}</h3>
            <p>{album.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}