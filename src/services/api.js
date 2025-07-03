export const submitNews = async (formData) => {
  const token = localStorage.getItem('token'); // Get token

  try {
    const response = await fetch('http://localhost:5000/api/news', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to submit news');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
