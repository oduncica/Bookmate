import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  console.log('EMAIL_USERNAME:', process.env.EMAIL_USERNAME);
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;