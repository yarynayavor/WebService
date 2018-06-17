const express=require('express');
const routes=require('./routes/api');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

const app=express();

//connect to db
mongoose.connect('mongodb://localhost:27017/theukrainians');
mongoose.Promise=global.Promise;

app.use(express.static('web'));

app.use(bodyParser.json());

// use it before all route definitions
app.use(cors());

app.use('/api',routes);

//if error
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});

app.listen(process.env.port || 4000,function() {
    console.log('now listening for requests');
});