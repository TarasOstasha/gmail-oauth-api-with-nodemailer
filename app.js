const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config()

const CLIENT_ID = CLIENT_ID
const CLIENT_SECRET = CLIENT_SECRET
const REDIRECT_URI = REDIRECT_URI
const REFRESH_TOKEN = REFRESH_TOKEN


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'tonyjoss1990@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const mailRecipients = ['garbiche.bucket90@gmail.com','taras.ostasha@gmail.com']
        const mailOptions = {
            from: 'tony joss <tonyjoss1990@gmail.com>',
            to: mailRecipients,
            subject: 'Hello from gmail using API',
            text: 'helllo world',
            html: '<h1>tony joss</h1>'
        };


        const result = await transport.sendMail(mailOptions);
        return result;

    } catch (error) {
        return error
    }
}

sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message)); 

// source - https://www.youtube.com/watch?v=-rcRf7yswfM