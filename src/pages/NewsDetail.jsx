import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsById } from '../services/api';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(id);
        console.log('🟢 Response JSON:', data);
        setNews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNews();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!news) {
    return <p>Loading...</p>;
  }

  const BASE_URL = 'https://your-backend-app.onrender.com'; // लोकल के लिए
  const mediaUrl = news.media ? `${BASE_URL}${news.media}` : null;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {mediaUrl ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {mediaUrl.endsWith('.mp4') ? (
            <video
              controls
              src={mediaUrl}
              style={{
                width: '50%',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              }}
            />
          ) : (
            <img
              src={mediaUrl}
              alt="News Media"
              style={{
                width: '50%',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', color: '#777' }}>
          ⚠️ कोई मीडिया उपलब्ध नहीं है
        </p>
      )}

      <h1
        style={{
          fontSize: '2.2rem',
          marginBottom: '1rem',
          fontWeight: '700',
          color: '#333',
          textAlign: 'center',
        }}
      >
        {news.title}
      </h1>

      <div
        style={{
          fontSize: '1.15rem',
          lineHeight: '1.7',
          marginBottom: '1.5rem',
          color: '#444',
          whiteSpace: 'pre-line',
        }}
      >
        {news.content}
      </div>
    </div>
  );
};

export default NewsDetail;
