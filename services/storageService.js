// services/storageService.js

const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Initialize the Google Cloud Storage client
const storage = new Storage({
  keyFilename: path.join(__dirname, 'WRITE_YOUR_BUCKET_PATH'),
});
const bucketName = 'Collections';   
const bucket = storage.bucket(bucketName);

async function uploadFile(filename, dest) {
  await bucket.upload(filename, {
    destination: dest,
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });
  
  // Get the public URL of the uploaded file
  const file = bucket.file(dest);
  const [url] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  return url;
}
async function downloadFile(src, dest) {
  const options = {
    destination: dest,
  };

  await bucket.file(src).download(options);
}

module.exports = {
  uploadFile,
  downloadFile,
};
