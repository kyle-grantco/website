const nodemailer = require('nodemailer');

// Create Mailtrap transporter
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "YOUR_MAILTRAP_USER",
    pass: "YOUR_MAILTRAP_PASS"
  }
});

// Email sending function
async function sendEmail(req, res) {
  const { email } = req.body;

  const mailOptions = {
    from: 'kyle@thegrant.co',
    to: email,
    subject: 'Mastercard Foundation Grant Insights',
    text: `Sounds like you're a great fit for the Mastercard Foundation grant!

In our experience there are some secrets to putting together a winning proposal. Here are the secrets: https://drive.google.com/file/d/1f5oJd0hdMqVU0zz7S3mGYzaMbqD4YNOc/view?usp=drive_open

If you want help applying please let us know and we'd be happy.

Yours, Kyle
Founder Grant&Co`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

module.exports = sendEmail;