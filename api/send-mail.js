const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN_NAME,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (category, name, email, subject, message, cb) => {
  const recipient = process.env.EMAIL_RECIPIENT;
  const mailOptions = {
    from: `SS Customer: ${name} <${email}>`,
    to: recipient,
    subject: `${category}: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("ERR: ", err);
      cb(err, null);
    } else {
      console.log("SENT!");
      cb(null, data);
    }
    transporter.close();
  });
};

module.exports = sendMail;
