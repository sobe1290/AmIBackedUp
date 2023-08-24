import React from 'react';


const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Am I Backed Up?</h1>
      <h2>Directory Comparison Tool</h2>
      <h3>Enter the absolute file path of your source directory and then your destination directory. This tool will out put which files did not back up, by recursively checking MD5 hash values within.</h3>
    </header>
  );
};

export default Header;