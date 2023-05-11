const jwt =require('jsonwebtoken')
const {UserModel} = require("../models/user.model") 
require("dotenv").config()
const authMiddleWare = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token,process.env.secret)
        const {userId} = decodedToken;
        //Checking if user exists
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(401).json({message:"Please Login Again",ok:false})
        }
        if(user.isBlocked){
            return res.status(403).json({message: 'Your account has been Blocked', ok:false})
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
}

module.exports = {authMiddleWare}
