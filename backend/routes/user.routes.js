const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

userRoute.post("/register", async(req,res)=>{
    const {name,email,pass,role} = req.body;
    const check = await UserModel.find({email});
    if(check.length > 0){
        return res.status(200).json({"ok":false,"msg":"User already exist"});
    }

    bcrypt.hash(pass, 5, async (err, hash)=> {
        try {
            const data = new UserModel({name,email, pass:hash, role});
            await data.save();
            res.status(200).json({"ok":true,"msg":"Registered Successfully"});
    
        } catch (error) {
            res.status(400).json({"ok":false,"msg":error.message});
        }

    });
})

userRoute.post("/login", async(req,res)=>{
    const {email, pass} = req.body;
    try {
        let check = await UserModel.find({email})
        
        if(check.length > 0){

            bcrypt.compare(pass, check[0].pass, async(err, result)=> {
                try {
                    if(result){
                        const token = jwt.sign({
                            userID: check[0]._id
                        }, 'token', { expiresIn: '24hr' });
                        res.status(200).json({ok:true,msg:"Logged in Successfully",token});
                    } else {
                        res.status(400).json({ok:false,msg:"Wrong E-mail or Password"});
                    }
                    
                } catch (error) {
                    res.status(400).json({ok:false,msg:error.message});
                }
            });

        } else {
            res.status(400).json({ok:false,msg:"Please Register First"});
        }

    } catch (error) {
        res.status(400).json({ok:false,msg:error.message});
    }
})


module.exports = {
    userRoute
}