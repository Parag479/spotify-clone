import axios from 'axios';

const API_BASE = 'https://api.spotify.com/v1';
const TIMEOUT = 10000; // 10 seconds

const api = axios.create({
  baseURL: API_BASE,
  timeout: TIMEOUT
});

export const verifyToken = async (token) => {
  try {
    await api.get('/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const fetchWithToken = async (endpoint, token, params = {}) => {
  try {
    const response = await api.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      params: { ...params, country: 'US', limit: 10 }
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