import React, { useState } from 'react';
import axios from 'axios';

const FolderComparisonForm = () => {
  const [folder1, setFolder1] = useState('');
  const [folder2, setFolder2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the data object with folder1 and folder2
    const data = {
      folder1: folder1,
      folder2: folder2,
    };

    // Send the POST request to the server
    axios.post('http://localhost:3000/compare-folder-hashes', data)
      .then((response) => {
        // Handle the response from the server
        console.log('Server response:', response.data);
        setResult(response.data.result);
        setError('');
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error sending POST request:', error.message);
        setResult('');
        setError('An error occurred while fetching data.');
      });
  };

  return (
    <div className="formBox">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="folder1">Source Folder:</label>
          <input
            type="text"
            id="folder1"
            value={folder1}
            onChange={(e) => setFolder1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="folder2">Destination Folder:</label>
          <input
            type="text"
            id="folder2"
            value={folder2}
            onChange={(e) => setFolder2(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div>
          <h3>Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default FolderComparisonForm;
