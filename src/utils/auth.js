import { SPOTIFY_CONFIG } from '../config/spotify';

export const getAuthUrl = () => {
  const { AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, SCOPES, RESPONSE_TYPE } = SPOTIFY_CONFIG;
  
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    response_type: RESPONSE_TYPE,
    show_dialog: true
  });

  return `${AUTH_ENDPOINT}?${params.toString()}`;
};

export const getTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
};

export const isTokenExpired = () => {
  const tokenTimestamp = localStorage.getItem('spotify_token_timestamp');
  const tokenExpiryTime = 3600 * 1000; // 1 hour in milliseconds
  return Date.now() - tokenTimestamp > tokenExpiryTime;
};

export const saveToken = (token) => {
  localStorage.setItem('spotify_token', token);
  localStorage.setItem('spotify_token_timestamp', Date.now());
};