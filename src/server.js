const express = require("express");
const UsersRoutes = require("./routes/UsersRoutes");
const CategoriesRoutes = require("./routes/CategoriesRoutes");
const ProductsRoutes = require("./routes/ProductsRoutes");

const host = "localhost";
const port = 3001;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Olá, eu sou um backend com NodeJS e Express");
});

app.use(UsersRoutes);
app.use(CategoriesRoutes);
app.use(ProductsRoutes);

app.listen(port, () =>
  console.log(`Servidor executando em http://${host}:${port}`)
);
