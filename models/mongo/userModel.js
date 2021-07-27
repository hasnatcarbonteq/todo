const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 10;
require('dotenv').config()
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        firstName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        token:{
            type: String,
        }
    }
)

// saving user data
UserSchema.pre('save', ( next) => {
    let user = this
    console.log(req, user)
    bcrypt.genSalt(SALT, (err, salt)=>{
        if(err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            console.log(user.password)
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

// comparing password entered on login
UserSchema.methods.comparePassword = (inputPassword, callBack) => {
    bcrypt.compare(inputPassword, this.password, (err, isMatch) => {
        if(err) return callBack(err)
        callBack(null, isMatch)
    })
}

// generating jwt token on login
UserSchema.methods.generateToken = (callBack) =>{
    let user = this
    let token = jwt.sign(user._id.toHexString(), process.env.SECRET)
    user.token = token
    user.save((err, user) => {
        if(err) return callBack(err)
        callBack(null, user)
    })
}

// validation token for auth middleware
UserSchema.statics.findByToken = (token, callBack) => {
    let user = this
    jwt.verify(token, process.env.SECRET, (err, decode) => {
        user.findOne({
            '_id': decode,
            'token': token
        }, (err, user) => {
            if(err) return callBack(err)
            callBack(null, user)
        })
    })
}


const User = mongoose.model('User', UserSchema)

module.exports = {User}