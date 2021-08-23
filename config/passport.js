const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-local").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const SECRET = process.env.SECRET;

const opt = {};

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = SECRET;

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            ()=> {
                
            }
        )
    );
};
