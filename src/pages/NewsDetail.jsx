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

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.description}</p>
      {news.imageUrl && <img src={news.imageUrl} alt="News" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default NewsDetail;
