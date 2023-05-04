const express = require("express");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {UserModel} = require("../models/user.model");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const authRoute = express.Router();


// Google Oauth
authRoute.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get(
    "/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
        session: false
    }),
    function (req, res) {
        let user = req.user;
    
        res.redirect(`https://github.com?id=${user._id}`); // chnge the link to frontend
    }
);

authRoute.get("/google/failure", (req,res)=>{
    res.redirect("https://google.com")
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://bookmyshoot-backend.onrender.com/auth/google/callback", // change the callback link
            passReqToCallback: true
        },
        async function (request, accessToken, refreshToken, profile, cb) {
            let email = profile._json.email;
            let udata = await UserModel.findOne({ email });
            if (udata) {
              return cb(null, udata);
            }
            let name = profile._json.name;

            const user = new UserModel({
              name,
              email,
              pass: uuidv4(),
            });
            await user.save();
            return cb(null, user);
        }
    )
);
// -------------Till here------------




module.exports = {
    authRoute
}