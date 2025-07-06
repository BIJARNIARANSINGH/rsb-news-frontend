import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/api";

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/news`);
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setNewsList(data);
      setFilteredNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    let data = [...newsList];

    if (categoryFilter) {
      data = data.filter((n) => n.category === categoryFilter);
    }

    if (search) {
      data = data.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredNews(data);
    setCurrentPage(1);
  }, [search, categoryFilter, sortOrder, newsList]);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentNews = filteredNews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNews.length / perPage);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📰 Latest News</h2>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Search by Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", flex: "1" }}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Categories</option>
          <option value="Finance">Finance</option>
          <option value="Property">Property</option>
          <option value="Political">Political</option>
          <option value="Jobs">Jobs</option>
          <option value="Technical">Technical</option>
          <option value="Learn English with Vikram">
            Learn English with Vikram
          </option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {currentNews.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No news found.</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {currentNews.map((news) => (
              <Link
                key={news._id}
                to={`/news/${news._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                }}
              >
                {news.media && (
                  <>
                    {news.media.endsWith(".mp4") ? (
                      <video
                        controls
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      >
                        <source src={`https://rsb-news-backend.onrender.com${news.media}`} />
                      </video>
                    ) : (
                      <img
                        src={`https://rsb-news-backend.onrender.com${news.media}`}
                        alt="media"
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                  </>
                )}
                <h4 style={{ margin: "10px 0 5px 0" }}>{news.title}</h4>
                <p style={{ fontSize: "0.85em", color: "#666" }}>
                  {news.category} •{" "}
                  {new Date(news.createdAt).toLocaleDateString()}
                </p>
                <p style={{ fontSize: "0.9em", margin: "5px 0" }}>
                  {news.content.slice(0, 60)}...
                </p>
                <p style={{ color: "#007bff", marginTop: "auto" }}>
                  Read more →
                </p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: "6px 12px",
                  background: page === currentPage ? "#007bff" : "#eee",
                  color: page === currentPage ? "#fff" : "#333",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
