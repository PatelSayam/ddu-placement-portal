import React, { useState } from 'react';
import axios from 'axios';

const UploadPDF = () => {
  const [file, setFile] = useState(null);
  const [keywords, setKeywords] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/uploadpdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setKeywords(response.data.data);
    } catch (error) {
      console.error(error);
      alert('Error uploading file'+error);
    }
  };

  return (
    <div>
      <h1>Upload Company Brochure (PDF)</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload PDF</button>

      {keywords && (
        <div>
          <h2>Extracted Keywords</h2>
          <ul>
            <li><strong>Roles:</strong> {keywords.roles.join(', ')}</li>
            <li><strong>Locations:</strong> {keywords.locations.join(', ')}</li>
            <li><strong>Salary:</strong> {keywords.salary.join(', ')}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadPDF;
