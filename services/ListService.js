const List = require("../db/models/mongo/listModel");
const User = require("../db/models/mongo/userModel");

class ListService {
    GetList = async (token) => {
        return await List.find({user: token});
    }

    UpdateList = async (id) => {
        try{
            let list = await List.findOne({_id: id})
            list.status = !list.status
            await List.findByIdAndUpdate(id, {status: list.status})
            return list
        }catch(err){
            return err
        }
    }

    AddItem = async (token, body) => {
        let user = await User.findOne({_id: token})
        let list = new List({
                title: body.task,
                status: false,
                dueDate: body.time,
                user: user._id
            })
        try{
            await list.save()
            return true
        }catch (err){
            return false
        }
    }

    RemoveItem = async (id) => {
        try{
            await List.findByIdAndDelete(id)
            return true
        }catch (err){
            return false
        }
    }
}

module.exports = new ListService();