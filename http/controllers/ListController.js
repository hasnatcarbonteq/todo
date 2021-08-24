const ListService = require("../../services/ListService")
const ListValidation = require("../../validations/ListValidation")
class ListController {

    GetList = async (req, res) => {
        try{
            let list  = await ListService.GetList(req.session.token)
            res.render('index', {list: list, data: req.session.token})
            console.log(req.headers['cookie'])
            return list
        }catch (err){
            console.log(err)
        }

    }

    UpdateList = async (req, res) => {
        try{
            let list = await ListService.UpdateList(req.params.id)
            if(list){
                res.redirect('/')
            }
        }catch(err){
            console.log(err)
        }
    }

    AddItem = async (req, res) => {
        const errors = await ListValidation(req, res);

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                errors: errors
            });
        }

        try{
            let user = await ListService.AddItem(req.session.token, req.body)
            if(user){
                res.redirect('/')
            }

        } catch(err){
            console.log(err)
        }
    }

    RemoveItem = async (req, res) => {
        try{
            let list = await ListService.RemoveItem(req.params.id)
            if(list){
                res.redirect('/')
            }
        }catch (err){
            console.log(err)
        }
    }
}

module.exports = new ListController();