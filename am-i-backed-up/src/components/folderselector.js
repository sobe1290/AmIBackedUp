import React, { useState } from 'react';

const FolderSelector = () => {
  const [folder1, setFolder1] = useState('');
  const [folder2, setFolder2] = useState('');

  const handleFolder1Change = (event) => {
    setFolder1(event.target.value);
  };

  const handleFolder2Change = (event) => {
    setFolder2(event.target.value);
  };

  return (
    <div>
      <div className="formBox">
        <h2>Box 1</h2>
        <select value={folder1} onChange={handleFolder1Change}>
          <option value="">Select a folder</option>
          <option value="folder1">Folder 1</option>
          <option value="folder2">Folder 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="formBox">
        <h2>Box 2</h2>
        <select value={folder2} onChange={handleFolder2Change}>
          <option value="">Select a folder</option>
          <option value="folder1">Folder 1</option>
          <option value="folder2">Folder 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
};

export default FolderSelector;
