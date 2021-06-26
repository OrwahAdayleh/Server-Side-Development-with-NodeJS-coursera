const express=require('express');
const bodyParser=require('body-parser');

const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.header('Content-Type', 'text/plain');
    next();
    })
    
    .get((req,res,next)=>{
        res.end('will send all the leaders info. for you');
    })
    
    .post((req,res,next)=>{
    res.statusCode=403;
        res.end('will add the leader '+ req.body.name + ' with details ' + req.body.description);
    })
    
    .put((req,res,next)=>{
        res.end('PUT operation not supported on /leaders');
        })
    
    .delete((req,res,next)=>{
            res.end('Deleteing all the leaders info.!!!!!');
        });



leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end('will send the leader : '+ req.params.promoId+ ' to you!');
})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /leaders yet:'+req.params.promoId);
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.write('will update the leader '+req.params.promoId + '\n');
    res.end('will update the leader '+ req.body.name + 'with details' + req.body.description);
    })

.delete((req,res,next)=>{
        res.end('Deleteing all leaders info. ' + req.params.promoId);
    });
module.exports=leaderRouter;