// middleware/multerConfig.js

const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files'); // Directory where files will be temporarily stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Preserve the original file name
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

module.exports = upload;
