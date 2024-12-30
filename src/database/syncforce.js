const connection = require("../config/connection");

require("../models/UsersModel");
require("../models/ProductsModel");
require("../models/CategoriesModel");
require("../models/ProductsCategoriesModel");
require("../models/ImagesProductModel");
require("../models/OptionsProductModel");

connection
  .sync({ force: true })
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });
