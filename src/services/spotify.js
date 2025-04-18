import axios from 'axios';

const API_BASE = 'https://api.spotify.com/v1';
const TIMEOUT = 5000;

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: TIMEOUT
});

export const verifyToken = async (token) => {
  try {
    await apiClient.get('/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const getAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_CLIENT_ID,
    response_type: 'token',
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    scope: process.env.REACT_APP_SCOPES,
    show_dialog: true // Forces login prompt
  });
  return `${process.env.REACT_APP_AUTH_ENDPOINT}?${params.toString()}`;
};

export const extractTokenFromHash = () => {
  const hash = window.location.hash.substring(1);
  return new URLSearchParams(hash).get('access_token');
};

const fetchWithToken = async (endpoint, token, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      params: { ...params, country: 'IN', limit: 10 }
    });
    return response.data?.items || response.data?.albums?.items || response.data?.playlists?.items || [];
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error.response?.data || error.message);
    throw error;
  }
};

export const getNewReleases = (token) => 
  fetchWithToken('/browse/new-releases', token);

export const getFeaturedPlaylists = (token) => 
  fetchWithToken('/browse/featured-playlists', token);

export const getCategories = (token) => 
  fetchWithToken('/browse/categories', token);