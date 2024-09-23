const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Function to refresh the access token

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: "patidarnisha2003@gmail.com",
    pass: "Nisha@2003",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    // accessToken: oAuth2Client.getAccessToken(),
  },
});

const subscribeController = async (req, res) => {
  try {
    const { name, email } = req.body;
    async function refreshAccessToken() {
        const { token } = await oAuth2Client.getAccessToken();
        return token;
      }
      
      // Use refreshAccessToken() wherever you need the access token
      const accessToken = await refreshAccessToken();
    transporter.verify((err, success) => {
      err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
    });
    const mailOptions = {
      from: {
        name: "Nisha Patidar",
        address: "patidarnisha2003@gmail.com",
      },
      to: email,
      subject: 'Sending email for verification',
      text: `Hello ${name}, please verify your email.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
      }

      console.log('Email sent:', info);
      console.log(info)
      return res.status(200).json({ status: 200, message: 'Email sent successfully' });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

module.exports = subscribeController;
