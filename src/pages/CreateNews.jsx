// src/pages/CreateNews.jsx

import React, { useState } from "react";
import { submitNews } from "../services/api";

const CreateNews = () => {
  const [mediaFile, setMediaFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [miscInput, setMiscInput] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleMediaChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setSubmitting(true);

    const finalCategory =
      category === "Miscellaneous" ? miscInput : category;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", finalCategory);
    if (mediaFile) {
      formData.append("file", mediaFile);
    }

    // ✅ DEBUG: Log all formData entries
    console.log("🟢 Submitting FormData:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await submitNews(formData);
      console.log("✅ Posted:", response);
      setStatus("✅ News submitted successfully!");

      // Reset fields
      setTitle("");
      setContent("");
      setCategory("");
      setMiscInput("");
      setMediaFile(null);
    } catch (err) {
      console.error("❌ Error:", err);
      setStatus(`❌ Failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const renderMediaPreview = () => {
    if (!mediaFile) return null;
    const type = mediaFile.type;
    const url = URL.createObjectURL(mediaFile);

    if (type.startsWith("image/")) {
      return (
        <img
          src={url}
          alt="Preview"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "6px",
            marginTop: "10px",
          }}
        />
      );
    } else if (type.startsWith("video/")) {
      return (
        <video
          controls
          style={{
            width: "100%",
            maxHeight: "300px",
            marginTop: "10px",
            borderRadius: "6px",
          }}
        >
          <source src={url} type={type} />
          Your browser does not support the video tag.
        </video>
      );
    }
    return (
      <p style={{ marginTop: "10px" }}>Selected file: {mediaFile.name}</p>
    );
  };

  const isSubmitDisabled =
    submitting ||
    !title.trim() ||
    !content.trim() ||
    !category ||
    (category === "Miscellaneous" && !miscInput.trim());

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create News</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {renderMediaPreview()}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "vertical",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="">Select Category</option>
          <option value="Finance">Finance</option>
          <option value="Property">Property</option>
          <option value="Political">Political</option>
          <option value="Jobs">Jobs</option>
          <option value="Technical">Technical</option>
          <option value="Learn English with Vikram">
            Learn English with Vikram
          </option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        {category === "Miscellaneous" && (
          <input
            type="text"
            placeholder="Enter custom category"
            value={miscInput}
            onChange={(e) => setMiscInput(e.target.value)}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          style={{
            padding: "12px",
            background: isSubmitDisabled ? "#999" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitDisabled ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Submit News"}
        </button>
      </form>

      {status && (
        <p
          style={{
            marginTop: "15px",
            color: status.startsWith("✅") ? "green" : "red",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default CreateNews;
