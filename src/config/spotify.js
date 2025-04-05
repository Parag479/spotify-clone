export const SPOTIFY_CONFIG = {
  AUTH_ENDPOINT: process.env.REACT_APP_AUTH_ENDPOINT,
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  REDIRECT_URI: process.env.REACT_APP_REDIRECT_URI,
  SCOPES: process.env.REACT_APP_SCOPES.split(' '),
  RESPONSE_TYPE: 'token'
}; 