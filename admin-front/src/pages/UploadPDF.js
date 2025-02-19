import React, { useState } from 'react';
import axios from 'axios';

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [keywords, setKeywords] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setKeywords(response.data); // Set extracted keywords
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {keywords && (
        <div>
          <h3>Extracted Information:</h3>
          <p><strong>Location:</strong> {keywords.location}</p>
          <p><strong>Job Role:</strong> {keywords.jobRole}</p>
          <p><strong>Stipend:</strong> {keywords.stipend}</p>
          <p><strong>Tech Stack:</strong> {keywords.techStack?.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
