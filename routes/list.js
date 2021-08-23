const express = require("express");
const router = express.Router();

const ListController = require("../controllers/ListController");

function checkAuth (req, res, next) {
    if(req.session.token) next()
    else res.redirect('/login')
}

router.get("/getList", ListController.GetList)

router.put("/updateList", ListController.UpdateList)

router.post("/addItem", checkAuth, ListController.AddItem)


module.exports = router;