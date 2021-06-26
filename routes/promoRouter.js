const express=require('express');
const bodyParser=require('body-parser');

const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.header('Content-Type', 'text/plain');
    next();
    })
    
    .get((req,res,next)=>{
        res.end('will send all the promotiones for you');
    })
    
    .post((req,res,next)=>{
    res.statusCode=403;
        res.end('will add the promotion'+ req.body.name + 'with details' + req.body.description);
    })
    
    .put((req,res,next)=>{
        res.end('PUT operation not supported on /promotiones');
        })
    
    .delete((req,res,next)=>{
            res.end('Deleteing all the promotiones!!!!!');
        });

 promoRouter.route('/:promoId')
.get((req,res,next)=>{
    res.end('will send the promotion : '+ req.params.promoId+ ' to you!');
})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /promotiones yet:'+req.params.promoId);
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.write('will update the promotion '+req.params.promoId + '\n');
    res.end('will update the promotion'+ req.body.name + 'with details' + req.body.description);
    })

.delete((req,res,next)=>{
        res.end('Deleteing promotion for you ' + req.params.promoId);
    });

    module.exports=promoRouter;
    