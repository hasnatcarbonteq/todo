const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController")

router.get("/login", (req, res) => {
    res.render('login')
})

router.get("/register", (req, res) => {
    res.render('register')
})

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
})

/**
 * @method - POST
 * @param - /register
 * @description - User SignUp
 */
router.post("/register", AuthController.Register)

router.post("/login", AuthController.Login)


module.exports = router;