const { User } = require('../models/mongo/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 10;


exports.RegisterUser = async (req,res) => {
    const user = new User(req.body)
   
    await user.save((err, doc) => {
        console.log(err,doc)
        if(err) return res.status(422).json({errors: err})
        else {
            const userData = {
                email: doc.email,
                firstName: doc.firstName,
                lastName: doc.lastName,
            }
            return res.status(200).json({
                success: true,
                message: 'Successfully Signed Up',
                userData
            })
        }
    })
}

exports.LoginUser = async (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.status(404).json({success: false, message: 'User does not exists!'})
        else {
            user.comparePasword(req.body.password, (err, isMatch) => {
                console.log(isMatch)
                if(!isMatch) return res.status(400).json({success: false, message: 'Wrong Password!'})
                else {
                    user.generateToken((err, user) => {
                        if(err) return res.status(400).send({err})
                        else {
                            const data ={
                                userId: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                token: user.token
                            }
                            res.session('authToken', user.token).status(200).json({
                                success: true,
                                message: 'Successfully Logged In!',
                                userData: data,
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.GetUserDetails = async (req, res) => {
    return res.status(200).json({
        isAuthenticated: true,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    })
}

exports.LogoutUser = async (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.user._id},
        {token: ''},
        err => {
            if(err) return res.json({success: false, err})
            req.session.destroy()
            return res.status(200).send({success: true, message: 'Successfully Logged Out!'})
        })
}