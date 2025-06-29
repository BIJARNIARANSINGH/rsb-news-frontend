// src/components/NewsCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={/news/${news._id}}>
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{news.title}</h2>
          <p className="text-sm text-gray-600">{new Date(news.createdAt).toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;