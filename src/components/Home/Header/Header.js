import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('new-releases');

  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    navigate('/login');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['new-releases', 'featured-playlists', 'browse-genres'];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="header-area">
      <header className="header">
        <div className="nav-tabs">
          <button 
            className={`tab-button ${activeSection === 'new-releases' ? 'active' : ''}`}
            onClick={() => scrollToSection('new-releases')}
          >
            Released This Week
          </button>
          <button 
            className={`tab-button ${activeSection === 'featured-playlists' ? 'active' : ''}`}
            onClick={() => scrollToSection('featured-playlists')}
          >
            Featured Playlists
          </button>
          <button 
            className={`tab-button ${activeSection === 'browse-genres' ? 'active' : ''}`}
            onClick={() => scrollToSection('browse-genres')}
          >
            Browse Genres
          </button>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
    </div>
  );
}