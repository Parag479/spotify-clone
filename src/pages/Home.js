import React, { useContext } from 'react';
import { SpotifyContext } from '../context/SpotifyContext';
import Header from '../components/Home/Header/Header';
import NewReleases from '../components/Home/NewReleases';
import FeaturedPlaylists from '../components/Home/Content/FeaturedPlaylists';
import BrowseGenres from '../components/Home/BrowseGenres';
import Player from '../components/Home/Player';
import ErrorMessage from '../components/UI/ErrorMessage';
import LoadingSpinner from '../components/UI/LoadingSpinner';

export default function Home() {
  const { token, loading, error } = useContext(SpotifyContext);

  if (!token) {
    return <p>No token found. Please log in.</p>;
  }

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Header />
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <main className="content-grid">
        <NewReleases />
        <FeaturedPlaylists />
        <BrowseGenres />
      </main>
      <Player />
    </div>
  );
}