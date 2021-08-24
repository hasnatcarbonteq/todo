const { check, validationResult} = require("express-validator");
const validator = require("validator")

const ListValidation = (req,res) => {

    let errors = {};

    if(validator.isEmpty(req.body.task)) errors.task = "Task name is required!"
    if(validator.isEmpty(req.body.time)) errors.time = "Time is required!"

    if(validator.isLength(req.body.task, {
        min: 6,
        max: 30
    })) errors.task = "Task name must be between 6 and 30 characters!"

    return errors;
}

module.exports = ListValidation;