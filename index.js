const express=require('express');
const routes=require('./routes/api');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const nodemailer=require('nodemailer');
 
//connect to db
mongoose.connect('mongodb://localhost:27017/theukrainians');
mongoose.Promise=global.Promise;
 
const app=express();
 
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 
app.use(express.static('web'));
app.use('/api',routes);
 

app.post('/send',function(req,res) {
    const output =`
        <p>Привіт, ${req.body.user_name}</p>
        <h3>На сайт добавлена нова новина.</h3>
        <p>З повагою,  </p>
        <p>Команда theUkrainiansMirror</p>
    `;

    let transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
            user: 'theukrainiansmirror@gmail.com', // generated ethereal user
            pass: '123abc***' // generated ethereal password
        },
        tls: {
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"theUkrainians Mirror" <theukrainiansmirror@gmail.com>', // sender address
        to: `${req.body.user_email}`,
        subject: 'New article added', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
 
//if error
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});

app.listen(process.env.port || 4000,function() {
    console.log('now listening for requests');
});