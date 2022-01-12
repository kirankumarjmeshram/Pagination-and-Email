const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "c12f0e43e775d7",
      pass: "b54a991af2493e",
    },
  });

  //module.exports = transporter;