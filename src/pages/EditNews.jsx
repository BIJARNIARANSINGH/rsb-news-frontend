// src/pages/EditNews.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState({ title: '', content: '', imageUrl: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchNews = async () => {
      try {
        const res = await axios.get('https://rsb-news-backend.onrender.com/api/news/${id}', {
          headers: {
            Authorization: 'Bearer ${token}',
          },
        });
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://rsb-news-backend.onrender.com/api/news/${id}', news, {
        headers: {
          Authorization: 'Bearer ${token}',
        },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating news:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={news.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-semibold">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={news.imageUrl}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-semibold">Content</label>
          <textarea
            name="content"
            value={news.content}
            onChange={handleChange}
            required
            rows="6"
            className="w-full border px-4 py-2 rounded mt-1"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update News
        </button>
      </form>
    </div>
  );
};

export default EditNews;