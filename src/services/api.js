// frontend/src/services/api.js

// ✅ लोकल backend URL
export const BASE_URL = 'https://your-backend-app.onrender.com';

// Submit news
export const submitNews = async (formData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/news`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // NOTE: Content-Type ना लगाएं, FormData के लिए खुद लगती है
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorText;
    } catch {
      errorMessage = errorText || 'Failed to submit news';
    }
    throw new Error(errorMessage);
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
    const errorText = await response.text();
    let errorMessage;
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorText;
    } catch {
      errorMessage = errorText || 'Failed to delete news';
    }
    throw new Error(errorMessage);
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
    const errorText = await response.text();
    let errorMessage;
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorText;
    } catch {
      errorMessage = errorText || 'Failed to fetch news details';
    }
    throw new Error(errorMessage);
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
    const errorText = await response.text();
    let errorMessage;
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorText;
    } catch {
      errorMessage = errorText || 'Failed to update news';
    }
    throw new Error(errorMessage);
  }

  return response.json();
};
