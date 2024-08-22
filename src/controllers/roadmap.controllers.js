const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const { getChatCompletion } = require("../utils/openai")
const User = require("../models/user.schema.js");
const { sendmail } = require('../utils/sendmail.js');
const { pdfcreater } = require('../utils/pdf.creater.js');
const {uploadPDF} = require('../utils/imagekit.js');
const { uploadPDFToCloudinary } = require("../utils/cloudinary.js");



exports.getroadmap = catchAsyncErrors(async (req, res, next) => {
  let student = await User.findById(req.id)
  
  // *********************************************

    let roadmap = await getChatCompletion(`Full Name: Lakshya Tanwar
      Gender: Male
      Country: India
      CIty: Bhopal
      Date of Birth: 5 July 2008
      
      Academics:      

      Class: 12th
      Educational board: CBSE
      10th marks: 80%
      11th Marks: 82%
      Stream: PCM
      Are you preparing for any entrance examination? - IIT-JEE
      Do you want to study abroad? - Yes
      Which is the most challenging subject for you?: Chemistry, Physics
      What is your short-term academic goal? - I'm lagging with chemistry, so I want to cover the chemistry syllabus, which I missed due to health issues.
      What is your long-term goal? - I want to crack IIT and pursue CS from IIT Bombay.
      
      Family Details:
      
      Father's Name: Rajesh Tanwar
      Mother's Name: Priya Tanwar
      Father's occupation: businessman
      Mother's occupation: housewife
      Sister's name: Jasmin Tanwar
      Sister's current education level: 9th grade student
      Brother's name: Yash Tanwar
      Brother's Current Education Level: College student
      Father's Annual Income: INR 500000
       
      Interests:
      
      What do you want to become in the future: Software Engineer at Google
      Interest Field Areas: Sports, CS, Community Service, Entrepreneurship, 
      Sports: Football, Basketball, Chess
      CS: AI, Web App
      Community Service: Solving pollution related problems, providing food, Teaching poor Schools, Dog Lover
      Entrepreneurship: AI related startup, Ed-tech, animal related Startup
      
      Activities/Extracurriculars:
      
      Skills you have: Communication skills, Marketing, Python, Graphic designing, Web Developement, Website Developement 
      Activity 1: Founder - Needy Binders - Providing food to needy ones
      Activity 2: Intern - Cross The Skylimits - Marketing Intern
      Activity 3: Co-founder - Nutrifido - Taking care of dogs, providing medication
      
      `)

    // *********************************************

    //   const cleanroadmap = async(roadmap) => {
    //     // Remove Markdown headers (##) and bold (**) formatting
    //     let cleanedRoadmap =await roadmap.replace(/[#*]/g, '');
    //     // Remove extra whitespace
    //     cleanedRoadmap =await cleanedRoadmap.replace(/\s{2,}/g, ' ').trim();
    //     return cleanedRoadmap;
    // };
    // const cleanedRoadmap =await cleanroadmap(roadmap);

    // *********************************************

    // create pdf of a roadmap
    let {pdfpath,pdfname} =await pdfcreater(`${student.email.split('@')[0]}`,roadmap)
    console.log('pdf path sending...',pdfpath);

    // *********************************************

    // this section is uncomplete
    // write code to send this pdf on imagekit and cloudinary

    // upload to imagekit
    // let {pdfpath,pdfname} = await pdfcreater(`${student.email.split('@')[0]}`,roadmap)
    // console.log('pdf path sending...',pdfpath);  

    // let fileName = await uploadPDF(pdfpath,pdfname)
    // console.log('pdf path sending...',fileName);

    // *********************************************

    // upload to a imagekit
    await uploadPDF(pdfpath,pdfname)  
    // let data = await uploadPDFToCloudinary(pdfpath)
    // console.log('cloudinary data :',data)

    // *********************************************
    // sending a mail using nodemailer
    sendmail(req,res,next,fileName,student)
    
    // *********************************************
    

    res.status(200).json({
      success: true,
      message: 'Roadmap has been generated and saved as PDF.',
      // filePath: fileName,
      // student
    })
})

// exports.getpdf = catchAsyncErrors(async (req, res, next) => {

//   const cloudinary = require('cloudinary').v2;

// // Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.CLOUDINARY_APP_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// //   secure: true,
// });

// const publicId = 'roadmap_pdfs/mh7guzvdrvgvxcgl0m60.pdf'; // Replace with your actual public ID

//     cloudinary.api.resource(publicId, { resource_type: 'raw' }, (error, result) => {
//         // if (error) {
//         //     console.error("Error fetching resource details:", error);
//         // } else {
//         //     console.log("Resource details:", result);
//         // }
//         res.status(200).json(result)
//     })
// })