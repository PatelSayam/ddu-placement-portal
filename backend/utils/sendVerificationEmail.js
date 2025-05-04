const generateEmailTemplate = require("./generateEmailTemplate");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const sendVerificationEmail = async (email, password) => {
  const from = process.env.GMAIL_EMAIL;
  const to = email;
  const subject = "Placement portal credentials";
  const html = generateEmailTemplate(email, password);

  console.log(process.env.GMAIL_EMAIL,email,html,process.env.TZ,process.env.SENDER,process.env.GMAIL_APP_PASS)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  let mailOptions = {
    from,
    to,
    subject,
    html,
  };

  try {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log("in sending mail >> ", err);
      } else {
        console.log("Email sent successfully >>", response);
      }
    });
  } catch (err) {
    console.log("in sending mail >> ", err);
  }
};

module.exports = { sendVerificationEmail };
