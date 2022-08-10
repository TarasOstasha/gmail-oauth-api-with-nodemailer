const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '334469035176-ub40ol0cvthf7lpuhftaj8ca4ca9tufv.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04UII75jmicAoCgYIARAAGAQSNwF-L9IryETvUmk0yIsR-1yatTyVi6HoBECzNo0aVuetC6qfsGgvU3EF9ofDZC7USRBbimTD_mU'


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