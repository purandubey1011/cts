const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDINARY_APP_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
});


// Function to upload a PDF
exports.uploadPDFToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw', // 'raw' is used for files like PDFs
      folder: 'roadmap_pdfs',
      format: 'pdf' // optional: specify a folder in Cloudinary
    });
    console.log('Uploaded PDF:', result.secure_url);
    return result;
  } catch (error) {
    console.error('Error uploading PDF:', error);
  }
};