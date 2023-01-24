const route = require("express").Router()
const controller = require("../controller/controller")

route.post("/",controller.addTask)
route.get("/",controller.getTask)
route.put("/:taskId",controller.editTask)
route.delete("/:taskId",controller.deleteTask)

module.exports = route