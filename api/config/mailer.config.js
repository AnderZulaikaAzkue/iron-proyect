const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Ironhackanderproject@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

module.exports.sendConfirmationEmail = (student) => {
  transporter
    .sendMail({
      from: "Iron Projects <Ironhackanderproject@gmail.com>",
      to: student.email,
      subject: "Confirm your account",
      html: `
        <h1>Welcome to Iron Projects</h1>
        <p>Click on the following link to confirm your account:</p>
        <a href="${process.env.API_URL}/students/${student.id}/confirm">Confirm</a>
      `,
    })
    .then((info) => console.log(info))
    .catch((error) => console.log(error));
};