// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { BASE_URL, deleteNews } from "../services/api";

const Dashboard = () => {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  const navigate = useNavigate();

  // Fetch all news
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/news`);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNewsList(data);
      setFilteredNews(data);
    } catch (err) {
      console.error("❌ Error:", err);
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await deleteNews(id);
      setStatus("✅ News deleted successfully.");
      fetchNews();
    } catch (err) {
      console.error("❌ Error deleting:", err);
      setStatus(`❌ ${err.message}`);
    }
  };

  // Handle search + filter + sort
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

  // Pagination calculations
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentNews = filteredNews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNews.length / perPage);

  if (loading) return <p>Loading news...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h2>Dashboard</h2>
        <Link
          to="createNew"
          style={{
            padding: "10px 15px",
            background: "#4CAF50",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          ➕ Create New News
        </Link>
      </div>

      <p style={{ marginTop: "10px" }}>
        Total Posts: <strong>{filteredNews.length}</strong>
      </p>

      <div
        style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}
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
          <option value="Learn English with Vikram">Learn English with Vikram</option>
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

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}

      {currentNews.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No news posts found.</p>
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
              <div
                key={news._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
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
                        <source src={`${BASE_URL}${news.media}`} />
                      </video>
                    ) : (
                      <img
                        src={`${BASE_URL}${news.media}`}
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
                  {news.category} • {new Date(news.createdAt).toLocaleDateString()}
                </p>
                <p style={{ fontSize: "0.9em", margin: "5px 0" }}>
                  {news.content.slice(0, 60)}...
                </p>
                <div style={{ marginTop: "auto", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => navigate(`/edit-news/${news._id}`)}
                    style={{ flex: "1" }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => navigate(`/news/${news._id}`)}
                    style={{ flex: "1" }}
                  >
                    🔍 View
                  </button>
                  <button
                    onClick={() => handleDelete(news._id)}
                    style={{ flex: "1" }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

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
                  padding: "5px 10px",
                  background: page === currentPage ? "#4CAF50" : "#eee",
                  color: page === currentPage ? "#fff" : "#333",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 🟢 This mounts nested route like /dashboard/createNew */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
