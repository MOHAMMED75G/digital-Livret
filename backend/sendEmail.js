// backend/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with the SMTP host for your email provider
  port: 587, // Replace with the appropriate port for your email provider
  secure: false, // Set to true if using SSL/TLS
  auth: {
    user: 'mohammedghrab94@gmail.com', // Replace with your email address
    pass: 'imvbgnofwgzhvgde', // Replace with the app password generated in the previous step
  },
});

const sendEmail = (data) => {
  const { fname, lname, phone, email, subject, company, message } = data;

  const mailOptions = {
    from: email, // Use the user-provided email address as the sender
    to: 'digitallivret@gmail.com', // Replace with the recipient's email address
    subject: `New Contact Form Submission - ${subject}`,
    html: `
      <h3>Contact Information:</h3>
      <p><strong>First Name:</strong> ${fname}</p>
      <p><strong>Last Name:</strong> ${lname}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmail;
