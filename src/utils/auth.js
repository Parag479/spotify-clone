export const getAuthUrl = () => {
    const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const scopes = process.env.REACT_APP_SCOPES;
  
    return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
      scopes
    )}&response_type=token&show_dialog=true`;
  };

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
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