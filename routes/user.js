const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController")


/**
 * @method - POST
 * @param - /register
 * @description - User SignUp
 */
router.post("/register", AuthController.Register)

router.post("/login", AuthController.Login)


module.exports = router;