import { useContext } from 'react';
import { SpotifyContext } from '../../../context/SpotifyContext';

export default function NewReleases() {
  const { newReleases } = useContext(SpotifyContext);

  return (
    <section className="section">
      <h2 className="section-title">New Releases</h2>
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