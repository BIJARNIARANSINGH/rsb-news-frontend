// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchNews = async () => {
      try {
        const res = await axios.get("https://rsb-news-backend.onrender.com/api/news", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNewsList(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news?')) return;

    try {
      await axios.delete(`https://rsb-news-backend.onrender.com/api/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewsList(newsList.filter((news) => news._id !== id));
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <Link
          to="/create-news"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add News
        </Link>
      </div>
      {newsList.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <div className="space-y-4">
          {newsList.map((news) => (
            <div key={news._id} className="bg-white p-4 shadow rounded">
              <h3 className="text-xl font-semibold">{news.title}</h3>
              <p className="text-gray-700 mt-2">{news.content.substring(0, 100)}...</p>
              <div className="mt-4 flex gap-4">
                <Link
                  to={`/edit-news/${news._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(news._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;