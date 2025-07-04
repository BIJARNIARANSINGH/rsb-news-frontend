import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../services/api";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mediaFile, setMediaFile] = useState(null);
  const [existingMedia, setExistingMedia] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [miscInput, setMiscInput] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Load existing news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(id);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category || "");
        if (
          data.category &&
          !["Finance", "Property", "Political", "Jobs", "Technical", "Learn English with Vikram"].includes(data.category)
        ) {
          setCategory("Miscellaneous");
          setMiscInput(data.category);
        }
        if (data.media) setExistingMedia(data.media);
      } catch (err) {
        console.error("❌ Error fetching news:", err);
        setStatus(`❌ ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleMediaChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setUpdating(true);

    const finalCategory = category === "Miscellaneous" ? miscInput : category;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", finalCategory);
    if (mediaFile) {
      formData.append("file", mediaFile);
    }

    try {
      await updateNews(id, formData);
      setStatus("✅ News updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error updating:", err);
      setStatus(`❌ ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const renderMediaPreview = () => {
    if (mediaFile) {
      const type = mediaFile.type;
      const url = URL.createObjectURL(mediaFile);

      if (type.startsWith("image/")) {
        return <img src={url} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />;
      } else if (type.startsWith("video/")) {
        return (
          <video controls style={{ maxWidth: "200px", marginTop: "10px" }}>
            <source src={url} type={type} />
            Your browser does not support the video tag.
          </video>
        );
      }
      return <p>Selected file: {mediaFile.name}</p>;
    }
    if (existingMedia) {
      if (existingMedia.endsWith(".mp4") || existingMedia.endsWith(".webm")) {
        return (
          <video controls style={{ maxWidth: "200px", marginTop: "10px" }}>
            <source src={`https://rsb-news-backend.onrender.com${existingMedia}`} />
          </video>
        );
      } else {
        return (
          <img
            src={`https://rsb-news-backend.onrender.com${existingMedia}`}
            alt="Existing"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        );
      }
    }
    return null;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit News</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
        {renderMediaPreview()}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "10px" }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          style={{ width: "100%", padding: "8px", marginTop: "10px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "10px" }}
        >
          <option value="">Select Category</option>
          <option value="Finance">Finance</option>
          <option value="Property">Property</option>
          <option value="Political">Political</option>
          <option value="Jobs">Jobs</option>
          <option value="Technical">Technical</option>
          <option value="Learn English with Vikram">Learn English with Vikram</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        {category === "Miscellaneous" && (
          <input
            type="text"
            placeholder="Enter custom category"
            value={miscInput}
            onChange={(e) => setMiscInput(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "10px" }}
          />
        )}

        <button
          type="submit"
          disabled={updating}
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          {updating ? "Updating..." : "Update News"}
        </button>
      </form>

      {status && <p style={{ marginTop: "15px" }}>{status}</p>}
    </div>
  );
};

export default EditNews;
