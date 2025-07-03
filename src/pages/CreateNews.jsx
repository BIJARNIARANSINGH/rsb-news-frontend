// src/pages/CreateNews.jsx

import React, { useState } from 'react';
import { submitNews } from '../services/api';

const CreateNews = () => {
  const [mediaFile, setMediaFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [miscInput, setMiscInput] = useState('');
  const [status, setStatus] = useState('');

  const handleMediaChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category === 'Miscellaneous' ? miscInput : category);
    if (mediaFile) {
      formData.append('file', mediaFile); // IMPORTANT: backend expects 'file'
    }

    try {
      const response = await submitNews(formData);
      console.log('✅ Posted:', response);
      setStatus('✅ News submitted successfully!');

      // Clear form
      setTitle('');
      setContent('');
      setCategory('');
      setMiscInput('');
      setMediaFile(null);
    } catch (err) {
      console.error('❌ Error:', err);
      setStatus('❌ Failed to submit news.');
    }
  };

  const renderMediaPreview = () => {
    if (!mediaFile) return null;
    const type = mediaFile.type;
    const url = URL.createObjectURL(mediaFile);

    if (type.startsWith('image/')) {
      return <img src={url} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />;
    } else if (type.startsWith('video/')) {
      return (
        <video controls style={{ maxWidth: '200px', marginTop: '10px' }}>
          <source src={url} type={type} />
          Your browser does not support the video tag.
        </video>
      );
    }

    return <p>Selected file: {mediaFile.name}</p>;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create News</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Media Input */}
        <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
        {renderMediaPreview()}

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginTop: '10px' }}
        />

        {/* Content */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          style={{ width: '100%', padding: '8px', marginTop: '10px' }}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginTop: '10px' }}
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

        {/* Misc Input */}
        {category === 'Miscellaneous' && (
          <input
            type="text"
            placeholder="Enter custom category"
            value={miscInput}
            onChange={(e) => setMiscInput(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          />
        )}

        {/* Submit */}
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
          Submit
        </button>
      </form>

      {status && <p style={{ marginTop: '15px' }}>{status}</p>}
    </div>
  );
};

export default CreateNews;
