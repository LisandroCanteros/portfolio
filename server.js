const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
let PORT = process.env.PORT || 3000;

dotenv.config();
let initialPath = path.join(__dirname, "");
let app = express();

app.use(express.static(initialPath));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"));
})

app.post('/mail', (req, res) => {
  const { firstname, lastname, email, msg } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  })

  const mailOptions = {
    from: email,
    to: "canteros.lisandro.a@gmail.com",
    subject: 'Portfolio',
    text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
  }

  transporter.sendMail(mailOptions, (err, result) => {
    if (err){
      console.log(err);
      res.json('Something went wrong. Please try again!')
    }else{
      res.json('Thank you for contacting me. I will reply to you within the next 24 hours.')
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
