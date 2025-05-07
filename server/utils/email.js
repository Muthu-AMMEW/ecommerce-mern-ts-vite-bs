const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const sendEmail = async options => {
  const transport = Nodemailer.createTransport(
    MailtrapTransport({
      token: process.env.MAIL_TRAP_TOKEN,
    })
  );

  const sender = {
    address: `<${process.env.SMTP_FROM_EMAIL}>`,
    name: `${process.env.SMTP_FROM_NAME}`,
  };

  await transport.sendMail({
    from: sender,
    to: options.email,
    subject: options.subject,
    text: options.message
  })
}

module.exports = sendEmail