const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3Config');

// Set up multer to upload directly to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read', // optional, allows public read access
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`); // Use timestamp and original filename
    }
  })
});

module.exports = upload;
const { now } = require('mongoose');
