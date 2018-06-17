const express=require('express');
const router = express.Router();
const News=require('../models/news');

//get data from the db
router.get('/news',function(req,res,next){
    News.find({}).then(function(news){
        res.send(news);
    })
});

//add new data to the db
router.post('/news',function(req,res,next){
    News.create(req.body).then(function(newItem){
        res.send(newItem);
    }).catch(next);
});

//update data element in the db
router.put('/news/:id',function(req,res,next){
    News.findByIdAndUpdate({_id:req.params.id },req.body).then(function(newItem){
        News.findOne({_id:req.params.id}).then(function(newItem){
            res.send(newItem);
        });
    })
    res.send(
        {type:"PUT"}
    );
});

//delete data element from the db
router.delete('/news/:id',function(req,res,next){
    News.findByIdAndRemove({_id:req.params.id }).then(function(newItem){
        res.send(newItem);
    });
    res.send(
        {type:"DELETE"}
    );
});

module.exports=router;