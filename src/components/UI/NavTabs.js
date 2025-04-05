import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpotifyContext } from '../../context/SpotifyContext';
import './NavTabs.css';

export default function NavTabs() {
  const [activeTab, setActiveTab] = useState('new-releases');
  const navigate = useNavigate();
  const { logout } = useContext(SpotifyContext);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'new-releases', label: 'Released This Week' },
    { id: 'featured-playlists', label: 'Featured Playlists' },
    { id: 'browse-genres', label: 'Browse Genres' }
  ];

  return (
    <nav className="nav-tabs">
      <div className="tabs-container">
        <div className="nav-left">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                scrollToSection(tab.id);
              }}
              aria-label={tab.id.split('-').join(' ')}
            >
              <span className="tab-dot"></span>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
} 