// frontend/src/services/api.js

export const BASE_URL = 'https://rsb-news-backend.onrender.com';

// Submit news
export const submitNews = async (formData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/news`, {
    method: 'POST',
    headers: {
      // Don't set Content-Type here
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit news');
  }

  return response.json();
};

// Delete news
export const deleteNews = async (newsId) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/news/${newsId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete news');
  }

  return response.json();
};

// Fetch news by ID
export const getNewsById = async (newsId) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/news/${newsId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch news details');
  }

  return response.json();
};

// Update news
export const updateNews = async (newsId, formData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/news/${newsId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update news');
  }

  return response.json();
};
