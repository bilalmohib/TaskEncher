var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mbilals9922@gmail.com',
    pass: '123321123BiLaL'
  }
});

var mailOptions = {
  from: 'mbilals9922@gmail.com',
  to: 'bilalmohib7896@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});