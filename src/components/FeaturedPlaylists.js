import { useContext } from 'react';
import { SpotifyContext } from '../../context/SpotifyContext';
import './FeaturedPlaylists.css';

export default function FeaturedPlaylists() {
  const { featuredPlaylists } = useContext(SpotifyContext);

  return (
    <section className="section">
      <h2 className="section-title">Featured Playlists</h2>
      <div className="grid-container">
        {featuredPlaylists.map((playlist) => (
          <div key={playlist.id} className="card">
            <img src={playlist.images[0].url} alt={playlist.name} />
            <h3>{playlist.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}