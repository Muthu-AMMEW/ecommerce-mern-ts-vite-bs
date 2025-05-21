const nodemailer = require("nodemailer");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("./errorHandler");

const sendEmail = catchAsyncError(async options => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.SMTP_FROM_EMAIL}`,
      pass: `${process.env.SMTP_PASSWORD}`, // NOT your real password
    },
  });

  let mailOptions = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // <-- sender name here
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    
    if (error) {
        return next(new ErrorHandler(error, 404));
    }
    console.log('Message sent:', info.response);
  });
})

module.exports = sendEmail