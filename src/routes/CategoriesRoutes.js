const express = require("express");
const CategoriesController = require("../controllers/CategoriesController");
const isAuthenticated = require("../middleware/isAuthenticated");

const CategoriesRoutes = express.Router();
const categoriesController = new CategoriesController();

CategoriesRoutes.get("/categories", categoriesController.list);
CategoriesRoutes.get("/categories/:id", categoriesController.findById);
CategoriesRoutes.post(
  "/categories",
  isAuthenticated,
  categoriesController.create
);
CategoriesRoutes.put(
  "/categories/:id",
  isAuthenticated,
  categoriesController.update
);
CategoriesRoutes.delete(
  "/categories/:id",
  isAuthenticated,
  categoriesController.delete
);

module.exports = CategoriesRoutes;
