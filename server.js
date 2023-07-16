const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const dotenv = require('dotenv');
require('dotenv').config();

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Define the path to your PowerShell script
const scriptPath = process.env.POWERSHELL_SCRIPT_PATH;

app.use(express.json());
app.use(cors());

// API endpoint to compare folder hashes
app.post('/compare-folder-hashes', (req, res) => {
  const { folder1, folder2 } = req.body;

  console.log('Script path:', scriptPath);

  // Spawn the PowerShell process with the script and arguments
  const child = spawn('powershell.exe', [
    '-ExecutionPolicy',
    'Bypass',
    '-File',
    scriptPath,
    '-folder1',
    folder1,
    '-folder2',
    folder2,
  ]);

  let output = '';
  let errorOutput = ''; // To capture error messages

  // Capture the output of the PowerShell script
  child.stdout.on('data', (data) => {
    output += data.toString();
  });

 // Capture the error output stream of the PowerShell script
child.stderr.on('data', (data) => {
  console.error('Error from PowerShell script:', data.toString());
  errorOutput += data.toString();
});


  // Handle errors or script completion
  child.on('error', (err) => {
    console.error('Error executing PowerShell script:', err.message);
    res.status(500).json({ error: 'An error occurred while executing the script.' });
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('PowerShell script executed successfully!');
      console.log('Script output:', output);

      // Send the script output as the response to the front end
      res.json({ result: output });
    } else {
      console.error('PowerShell script execution failed. Exit code:', code);
      console.error('Script output:', output);
      res.status(500).json({ error: 'An error occurred while executing the script.' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
