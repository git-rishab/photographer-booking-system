const jwt = require("jsonwebtoken");

const authorization = (req,res,next)=>{
    jwt.verify(req.headers?.token, 'token', (err, decoded)=>{
        if(err){
            res.status(400).json({ok:false,msg:err.message});
        }
        if(decoded){
            next();
        }
    });
}

module.exports = {
    authorization
}