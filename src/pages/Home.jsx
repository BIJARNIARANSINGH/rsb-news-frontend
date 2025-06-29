// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('https://rsb-news-backend.onrender.com/api/news');
        setNewsList(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newsList.map((news) => (
          <div key={news._id} className="bg-white shadow rounded overflow-hidden">
            {news.imageUrl && (
              <img src={news.imageUrl} alt={news.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{news.title}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{news.content.slice(0, 120)}...</p>
              <Link
                to={'/news/${news._id}'}
                className="inline-block mt-4 text-blue-600 hover:underline font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;