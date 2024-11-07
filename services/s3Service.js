const s3 = require('../config/s3Config');

// Upload file to S3 and return the file URL
exports.uploadToS3 = async (file, folder) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'  // Allow public access to files
  };
  
  const data = await s3.upload(params).promise();
  return data.Location; // Return the file URL
};
