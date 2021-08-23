const { check, validationResult} = require("express-validator");

const List = require("../models/mongo/listModel");
const User = require("../models/mongo/userModel");

class ListController {

    async GetList(req, res) {
        try{
            let list  = await List.find({user: req.session.token})
            res.render('index', {list: list, data: req.session.token})
        }catch (err){
            console.log(err)
        }

    }

    async UpdateList(req, res) {

    }

    async AddItem(req, res) {

        try{
            let user = await User.findOne({_id: req.session.token})
            let list = new List({
                    title: req.body.task,
                    status: false,
                    dueDate: req.body.time,
                    user: user._id
                })

                list.save().then(() => {
                    console.log(list)
                    res.redirect('/')
                })
            if(!list){
                // let response = await List.create(
                //     {
                //         title: req.body.task,
                //         dueDate: req.body.time,
                //         user: user._id
                //     },
                // )
            }

        } catch(err){
            console.log(err)
        }
    }
}

module.exports = new ListController();