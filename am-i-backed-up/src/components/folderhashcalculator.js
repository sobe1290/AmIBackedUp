import React, { useState } from 'react';

const FolderHashCalculator = () => {
  const [folderPath, setFolderPath] = useState('');
  const [result, setResult] = useState('');

  const handleFolderPathChange = (event) => {
    setFolderPath(event.target.value);
  };

  const handleCalculateHash = () => {
    // Execute the PowerShell script using a suitable method (e.g., AJAX, fetch, Axios)
    // Pass the selected folder path as a parameter to the script
    // Capture the script output and set it as the result state
    // Display the result in the component

    // Example implementation using fetch:
    fetch('/calculate-folder-hash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folderPath }),
    })
      .then((response) => response.text())
      .then((data) => setResult(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <input type="text" value={folderPath} onChange={handleFolderPathChange} />
      <button onClick={handleCalculateHash}>Calculate Hash</button>
      <pre>{result}</pre>
    </div>
  );
};

export default FolderHashCalculator;
