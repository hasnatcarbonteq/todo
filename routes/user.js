const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/mongo/userModel");

/**
 * @method - POST
 * @param - /register
 * @description - User SignUp
 */
router.post("/register", 
    
    [
        check('username', 'Please Enter a Valid Username')
        .not()
        .isEmpty()
        .isLength(3, 50),
        check('email', 'Please Enter a Valid Email')
        .isEmail(),
        check('password', "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        
        const { username, email, password } = req.body;
        try{
            const user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }
            const newUser = await User.create({
                username,
                email,
                password: await bcrypt.hash(password, 10)
            });
            const token = jwt.sign({
                _id: newUser._id
            }, process.env.SECRET);
            return res.status(200).redirect('/login');
        }catch (error){
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
)

router.post("/login",
    check('email', 'Please Enter a Valid Email').isEmail(),
    check('password', 'Please Enter a Valid Password').isLength({
        min: 6,
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { email, password } = req.body;
        try{
            const user = await User.findOne({
                email
            });
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Password does not match"
                });
            }
            const token = jwt.sign({
                _id: user._id
            }, process.env.SECRET);
            return res.status(200).json({
                token,
                message: "Successfully logged in"
            });
        }catch (error){
            console.log(error.message);
            res.status(500).send("Error in Saving");
        }
    }
)

module.exports = router;