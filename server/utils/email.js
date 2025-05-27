import nodemailer from 'nodemailer';
import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from './errorHandler.js';

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

export default sendEmail;