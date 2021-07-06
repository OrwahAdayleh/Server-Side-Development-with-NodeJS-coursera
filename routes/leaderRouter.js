const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Leaders=require('../models/Leaders');
const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());
const authenticate=require('../models/authenticate');
const cors=require('./cors');
leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.all((req,res,next)=>{
    res.statusCode=200;
    res.header('Content-Type', 'text/plain');
    next();
    })
    
    // .get((req,res,next)=>{
    //     res.end('will send all the leaders info. for you');
    // })
.get(cors.cors,(req,res,next) => {
        Leaders.find({})
        .then((leaders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        }, (err) => next(err))
        .catch((err) => next(err));
    })   
    // .post((req,res,next)=>{
    // res.statusCode=403;
    //     res.end('will add the leader '+ req.body.name + ' with details ' + req.body.description);
    // })
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
        Leaders.create(req.body).then((leader)=>{
            console.log('Leader Created', leader);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        },(err) => next(err))
        .catch((err) => next(err));
        })
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
        })
    
    // .delete((req,res,next)=>{
    //         res.end('Deleteing all the leaders info.!!!!!');
    //     });
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
        Leaders.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));    
    });


leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=> {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /leaders yet:'+req.params.promoId);
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports=leaderRouter;