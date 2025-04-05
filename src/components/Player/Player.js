import React, { useState, useContext, useEffect, useRef } from 'react';
import { SpotifyContext } from '../../context/SpotifyContext';
import './Player.css';

const Player = () => {
  const { token } = useContext(SpotifyContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    name: 'No track playing',
    artist: 'Unknown Artist',
    albumArt: 'https://via.placeholder.com/60'
  });
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    // Load the Spotify Web Playback SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Spotify Clone Web Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
      });

      player.addListener('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
      });

      // Playback status updates
      player.addListener('player_state_changed', state => {
        if (!state) return;

        const { track_window, position, duration } = state;
        const currentTrack = track_window.current_track;
        
        if (currentTrack) {
          setCurrentTrack({
            name: currentTrack.name,
            artist: currentTrack.artists[0].name,
            albumArt: currentTrack.album.images[0].url
          });
          setDuration(duration);
          setProgress(position);
        }

        setIsPlaying(!state.paused);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        // Transfer playback to this device
        fetch('https://api.spotify.com/v1/me/player', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: false
          })
        });
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player
      player.connect();
      playerRef.current = player;

      return () => {
        player.disconnect();
      };
    };

    return () => {
      document.body.removeChild(script);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [token]);

  // Update progress every second when playing
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= duration) {
            clearInterval(progressIntervalRef.current);
            return 0;
          }
          return prev + 1000;
        });
      }, 1000);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const togglePlay = async () => {
    if (!playerRef.current) return;
    
    if (isPlaying) {
      await playerRef.current.pause();
    } else {
      await playerRef.current.resume();
    }
  };

  const handleProgressChange = async (e) => {
    const newPosition = parseInt(e.target.value);
    setProgress(newPosition);
    
    if (playerRef.current) {
      await playerRef.current.seek(newPosition);
    }
  };

  const handleVolumeChange = async (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (playerRef.current) {
      await playerRef.current.setVolume(newVolume / 100);
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player">
      <div className="player-left">
        <img src={currentTrack.albumArt} alt="Album art" className="album-art" />
        <div className="track-info">
          <div className="track-name">{currentTrack.name}</div>
          <div className="track-artist">{currentTrack.artist}</div>
        </div>
        <button className="like-button">
          <svg viewBox="0 0 24 24" className="like-icon">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="control-button shuffle">
            <svg viewBox="0 0 24 24" className="control-icon">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
            </svg>
          </button>
          <button className="control-button previous">
            <svg viewBox="0 0 24 24" className="control-icon">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button className={`control-button play ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="control-icon">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="control-icon">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button className="control-button next">
            <svg viewBox="0 0 24 24" className="control-icon">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
          <button className="control-button repeat">
            <svg viewBox="0 0 24 24" className="control-icon">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
            </svg>
          </button>
        </div>
        <div className="progress-container">
          <span className="time">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <button className="control-button queue">
          <svg viewBox="0 0 24 24" className="control-icon">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
          </svg>
        </button>
        <button className="control-button device">
          <svg viewBox="0 0 24 24" className="control-icon">
            <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" />
          </svg>
        </button>
        <div className="volume-container">
          <button className="control-button volume">
            <svg viewBox="0 0 24 24" className="control-icon">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player; 