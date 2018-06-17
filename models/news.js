const mongoose = require('mongoose');
const Schema=mongoose.Schema;

//create news Schema & model

const NewsSchema=new Schema({
    title: {
        type:String,
        required:[true,'Title field is required']
    }
});

const News=mongoose.model('news',NewsSchema);

module.exports=News;