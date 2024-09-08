const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  requireTLS: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
});
const sendMail = async (to, subject, content) => {
  const info = await transporter.sendMail({
    from: `"Wiser AI" <${process.env.EMAIL_SENDER}>`,
    to,
    subject,
    html: `${content}`,
  });
  return info;
};
module.exports = { sendMail };