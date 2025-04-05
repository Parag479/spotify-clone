import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../utils/spotifyApi';
import Heading from '../UI/Heading';
import './BrowseGenres.css';

export default function BrowseGenres() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    fetchCategories(token)
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (categories.length === 0) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <section id="browse-genres" className="section">
      <Heading variant="primary">Browse Genres</Heading>
      <div className="grid-container">
        {categories.map((category) => (
          <div key={category.id} className="card">
            <img src={category.icons[0].url} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}