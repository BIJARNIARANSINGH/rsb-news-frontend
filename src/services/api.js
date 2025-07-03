// src/services/api.js

export const BASE_URL = 'https://rsb-news-backend.onrender.com';

export const submitNews = async (formData) => {
  const token = localStorage.getItem('token'); // Get token

  try {
    const response = await fetch(`${BASE_URL}/api/news`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
        // NOTE: DON'T set Content-Type here; browser will set it automatically for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit news');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchNews = async () => {
  try {
    const response = await fetch(`${https://rsb-news-backend.onrender.com}/api/news`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchNewsById = async (id) => {
  try {
    const response = await fetch(`${https://rsb-news-backend.onrender.com}/api/news/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch news details');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
