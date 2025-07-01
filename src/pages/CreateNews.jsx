import React, { useState } from 'react';

const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalCategory =
      category === 'Other or Miscellaneous' ? customCategory.trim() : category;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', finalCategory);
    formData.append('image', image);

    fetch('/api/news', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        alert('📝 लेख सफलतापूर्वक बनाया गया!');
        setTitle('');
        setContent('');
        setCategory('');
        setCustomCategory('');
        setImage(null);
        setPreview('');
      })
      .catch((err) => console.error('❌ सबमिट करने में समस्या:', err));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">नया लेख बनाएँ</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          type="text"
          placeholder="लेख का शीर्षक"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <textarea
          placeholder="लेख की सामग्री"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 h-40"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800"
          required
        >
          <option value="">-- लेख की श्रेणी चुनें --</option>
          <option value="Finance">Finance</option>
          <option value="Politics">Politics</option>
          <option value="Education">Education</option>
          <option value="Learn English with Vikram">Learn English with Vikram</option>
          <option value="Interesting facts">Interesting facts</option>
          <option value="Stock Market Analysis">Stock Market Analysis</option>
          <option value="Property">Property</option>
          <option value="Other or Miscellaneous">Other or Miscellaneous</option>
        </select>

        {/* Show custom input if category is Other */}
        {category === 'Other or Miscellaneous' && (
          <input
            type="text"
            placeholder="अपनी श्रेणी दर्ज करें"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-700"
        />

        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className="max-h-64 object-contain border" />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          सबमिट करें
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
