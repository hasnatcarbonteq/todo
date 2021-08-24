const validator = require("validator")

const RegisterValidation = (req, res) => {

    let errors = {};

    if (validator.isEmpty(req.body.username)) errors.username = "Username is required";
    if (validator.isEmpty(req.body.email)) errors.email = "Email is required";
    if (validator.isEmpty(req.body.password)) errors.password = "Password is required";

    if (!validator.isLength(req.body.password, {
            min: 6,
            max: 30
    })) errors.password = "Password must be between 6 and 30 characters!";

    if (!validator.isEmail(req.body.email)) errors.email = "Email is invalid";

    
    return errors;
}

const LoginValidation = (req, res) => {


    let errors = {};

    if (validator.isEmpty(req.body.email)) errors.email = "Email is required";
    if (validator.isEmpty(req.body.password)) errors.password = "Password is required";

    if (!validator.isEmail(req.body.email)) errors.email = "Email is invalid";

    return errors;
}

module.exports = {
    RegisterValidation,
    LoginValidation
}