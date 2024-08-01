// controllers/fileController.js

const storageService = require('../services/storageService');
const path = require('path');
const fs = require('fs');

async function uploadFile(req, res) {
  try {
    const file = req.file;
    const dest = `uploads/${file.originalname}`;
    const url = await storageService.uploadFile(file.path, dest);
    fs.unlinkSync(file.path); // Clean up the temporary file
    res.status(200).json({ message: 'File uploaded successfully.', url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function downloadFile(req, res) {
  try {
    const { fileName } = req.params;
    const src = `uploads/${fileName}`;
    const dest = path.join(__dirname, '../files', fileName);

    await storageService.downloadFile(src, dest);

    res.download(dest, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      fs.unlinkSync(dest); // Clean up the downloaded file
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  uploadFile,
  downloadFile,
};
