// Fetch new releases
export const fetchNewReleases = async (token) => {
  const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch new releases');
  }

  const data = await response.json();
  return data.albums.items;
};

// Fetch featured playlists
export const fetchFeaturedPlaylists = async (token) => {
  const params = new URLSearchParams({
    country: 'US',
    locale: 'en_US',
    limit: 20,
    offset: 0,
    timestamp: new Date().toISOString()
  });

  const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch featured playlists');
  }

  const data = await response.json();
  if (!data.playlists?.items) {
    throw new Error('No playlists found in response');
  }
  return data.playlists.items;
};

// Fetch categories (genres)
export const fetchCategories = async (token) => {
  const response = await fetch('https://api.spotify.com/v1/browse/categories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await response.json();
  return data.categories.items;
};