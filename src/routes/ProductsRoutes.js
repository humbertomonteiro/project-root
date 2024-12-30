const express = require("express");
const ProductsController = require("../controllers/ProductsController");
const isAuthenticated = require("../middleware/isAuthenticated");

const ProductsRoutes = express.Router();
const productsController = new ProductsController();

ProductsRoutes.get("/products", productsController.list);
ProductsRoutes.get("/products/:id", productsController.findById);
ProductsRoutes.post("/products", isAuthenticated, productsController.create);
ProductsRoutes.put("/products/:id", isAuthenticated, productsController.update);
ProductsRoutes.delete(
  "/products/:id",
  isAuthenticated,
  productsController.delete
);

module.exports = ProductsRoutes;
