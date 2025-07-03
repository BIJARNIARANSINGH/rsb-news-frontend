import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('https://rsb-news-backend.onrender.com/api/news');
        // Sort descending by createdAt
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewsList(sorted);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = newsList
    .filter(
      (news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((news) =>
      selectedCategory ? news.category === selectedCategory : true
    );

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">ताज़ा समाचार</h2>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 शीर्षक या सामग्री खोजें..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 border border-gray-300 rounded px-3 py-2 bg-white"
        >
          <option value="">-- श्रेणी द्वारा फ़िल्टर करें --</option>
          <option value="Finance">Finance</option>
          <option value="Property">Property</option>
          <option value="Political">Political</option>
          <option value="Jobs">Jobs</option>
          <option value="Technical">Technical</option>
          <option value="Learn English with Vikram">Learn English with Vikram</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>

      {/* 📰 News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <div key={news._id} className="bg-white shadow rounded overflow-hidden">
            {news.mediaUrl ? (
              <img
                src={`https://rsb-news-backend.onrender.com${news.mediaUrl}`}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{news.title}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {news.content.slice(0, 120)}...
              </p>
              <Link
                to={`/news/${news._id}`}
                className="inline-block mt-4 text-blue-600 hover:underline font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <p className="text-center text-gray-500 mt-10">कोई परिणाम नहीं मिला।</p>
      )}
    </div>
  );
};

export default Home;
