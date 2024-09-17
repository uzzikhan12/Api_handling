const express = require("express");
const Route = express.Router();
const UserController = require('../controllers/usercontroller');
const AuthController = require("../controllers/authcontroller");

Route.get("/", UserController.GetAll);
Route.get("/:id", UserController.GetId);
Route.post("/", UserController.Post);
Route.put("/:id", UserController.Edit);
Route.delete("/:id", UserController.Delete);

module.exports = Route;