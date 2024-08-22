const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.pdfcreater=async(userid,roadmap)=>{

 // Create a new PDF document
    const doc = new PDFDocument();

    let roadmappath = path.join(__dirname, '..', 'public', 'roadmaps')
    const fileName = path.join(roadmappath,`${userid}.pdf`);
    doc.pipe(fs.createWriteStream(fileName));

    doc.fontSize(16).text('roadmap', {
        align: 'center'
    });

    doc.moveDown();
    doc.fontSize(12).text(roadmap);
    doc.end();


    return {
        pdfname:`${userid}.pdf`,
        pdfpath:fileName
    }

}