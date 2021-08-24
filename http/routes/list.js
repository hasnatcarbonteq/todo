const express = require("express");
const router = express.Router();

const ListController = require("../controllers/ListController");
const {checkAuthentication} = require('../middleware/auth')

router.get("/getList", checkAuthentication, ListController.GetList)

router.put("/updateList/:id", checkAuthentication, ListController.UpdateList)

router.post("/addItem", checkAuthentication, ListController.AddItem)

router.delete("/removeItem/:id", checkAuthentication, ListController.RemoveItem)


module.exports = router;