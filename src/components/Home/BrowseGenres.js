import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../utils/spotifyApi';
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
    return <p>{error}</p>;
  }

  if (categories.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section className="section">
      <h2 className="section-title">Browse Genres</h2>
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