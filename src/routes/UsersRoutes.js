const express = require("express");
const UsersController = require("../controllers/UsersController");
const isAuthenticated = require("../middleware/isAuthenticated");

const UsersRoutes = express.Router();
const usersController = new UsersController();

UsersRoutes.get("/users", usersController.list);
UsersRoutes.get("/users/:id", usersController.findById);
UsersRoutes.post("/users", usersController.create);
UsersRoutes.post("/login", usersController.login);
UsersRoutes.put("/users/:id", isAuthenticated, usersController.update);
UsersRoutes.delete("/users/:id", isAuthenticated, usersController.delete);

module.exports = UsersRoutes;
