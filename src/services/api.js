export const BASE_URL = 'https://rsb-news-backend.onrender.com';

// Example fetch wrapper for POSTing news
export const submitNews = async (formData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/news`, {
    method: 'POST',
    headers: {
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
