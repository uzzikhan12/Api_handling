const express = require("express");
const Route = express.Router();
const AuthController = require("../controllers/authcontroller");

Route.post("/login",AuthController.login);
Route.post("/signup",AuthController.signup);

module.exports = Route;