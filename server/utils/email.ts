import nodemailer from 'nodemailer';
import ErrorHandler from './errorHandler.js';

const sendEmail = async ({ email, subject, message }) => {

  const transporter = nodemailer.createTransport({
    service: `${process.env.SMTP_SERVICE}`,
    auth: {
      user: `${process.env.SMTP_FROM_EMAIL}`,
      pass: `${process.env.SMTP_PASSWORD}`,
    },
  });

  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: subject,
    text: message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    throw new ErrorHandler(`Email send failed: ${error.message}`, 500);
  }
}

export default sendEmail;