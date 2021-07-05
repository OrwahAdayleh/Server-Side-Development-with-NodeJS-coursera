const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const authenticate=require('../models/authenticate');
const Promotions=require('../models/promotions');
const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
    
.post(authenticate.verifyUser,(req,res,next)=>{
    Promotions.create(req.body).then((promotion)=>{
        console.log('promotion Created', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
    })
    
.put(authenticate.verifyUser,(req,res,next)=>{
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotiones');
        })
.delete(authenticate.verifyUser,(req, res, next) => {
    Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));    
 });

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /promotiones yet:'+req.params.promoId);
})

// .put((req,res,next)=>{
//     res.statusCode=403;
//     res.write('will update the promotion '+req.params.promoId + '\n');
//     res.end('will update the promotion'+ req.body.name + 'with details' + req.body.description);
//     })
.put(authenticate.verifyUser,(req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// .delete((req,res,next)=>{
//         res.end('Deleteing promotion for you ' + req.params.promoId);
//     });
.delete(authenticate.verifyUser,(req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
    module.exports=promoRouter;
    