const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());

app.post('/calculate-folder-hash', (req, res) => {
  const { folderPath } = req.body;

  const child = spawn('powershell.exe', [
    '-ExecutionPolicy',
    'Bypass',
    '-File',
    'path/to/CalculateFolderHash.ps1',
    '-FolderPath',
    folderPath,
  ]);

  let output = '';

  child.stdout.on('data', (data) => {
    output += data.toString();
  });

  child.on('close', () => {
    res.send(output);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
