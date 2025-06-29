// src/pages/CreateNews.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'https://rsb-news-backend.onrender.com/api/news',
        { title, content, imageUrl },
        {
          headers: {
            Authorization: 'Bearer ${token}',
          },
        }
      );
      if (res.status === 201) {
        alert('News created successfully!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error creating news:', err);
      alert('Failed to create news. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4">Create News</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 mb-4 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 mb-4 rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post News
        </button>
      </form>
    </div>
  );
};

export default CreateNews;