// src/pages/NewsDetails.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`https://rsb-news-backend.onrender.com/api/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news:', err.message);
        setError('Failed to load news article');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        Published: {new Date(news.createdAt).toLocaleString()}
      </p>
      {news.mediaUrl && (
        <img
          src={`https://rsb-news-backend.onrender.com${news.mediaUrl}`}
          alt={news.title}
          className="w-full h-auto rounded shadow mb-6"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
};

export default NewsDetails;
