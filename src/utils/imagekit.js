var ImageKit = require("imagekit");
const fs = require('fs');

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_ENDPOINT
});


exports.uploadPDF=async(filePath, fileName)=> {
    let fileData = fs.readFileSync(filePath);
    console.log(fileData) 
    // try {
    //     console.log('pdf path receving...',filePath);
    //     // Check if file exists
    //     if (!fs.existsSync(filePath)) {
    //         console.error("File not found:", filePath);
    //         return;
    //     }
    //      // Upload to ImageKit
    //     imagekit.upload({
    //         file: fileData,  // Required: the file data to be uploaded
    //         fileName: fileName,  // Required: name of the file
    //         folder: "/pdfs", // Optional: folder where the file will be stored
    //         tags: ['pdf', 'document'], // Optional: tags for the file
    //     }, function(error, result) {
    //         if (error) {
    //             console.error("Error uploading PDF:", error);
    //         } else {
    //             console.log("PDF uploaded successfully:", result);
    //             console.log("Access URL:", result.url);
    //         }
    //     });
    // } catch (err) {
    //     console.error("Error reading or uploading PDF:", err);
    // }
}


