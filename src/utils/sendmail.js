const nodemailer = require("nodemailer");
const ErorrHandler = require("./ErrorHandler");

exports.sendmail = (req, res, next,filepath,student) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        post: 465,
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "Cross The Skylimits",
        to: student.email,
        subject: `${student.name}'s roadmap from Cross The Skylimits`,
        // text: "Do not share this link to anyone",
        // html: `${roadmap} here is your roadmap!`,
        attachments: [
            {
                filename: `${req.id}.pdf`,
                path: filepath
            }
        ]
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return next(new ErorrHandler(err, 500));
        console.log(info);

        return res.status(200).json({
            message: "mail sent successfully",
            filepath,
        });
    });
};