// back-end (Node.js + Express)
const express = require('express');
const nodemailer = require('nodemailer');
const session = require('express-session');

const app = express();
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

app.post('/send-code', async (req, res) => {
  const code = Math.floor(100000 + Math.random() * 900000); // generate a 6-digit code
  req.session.code = code; // store the code in the session

  // send the code by email
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  let mailOptions = {
    from: 'your-email@gmail.com',
    to: req.body.email,
    subject: 'Código de verificação PensaCare',
    text: `Seu código de verificação é ${code}`
  };

  await transporter.sendMail(mailOptions);

  res.sendStatus(200);
});

app.post('/verify-code', (req, res) => {
  if (req.session.code === req.body.code) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.listen(3000);