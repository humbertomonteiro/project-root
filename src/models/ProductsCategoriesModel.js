const connection = require("../config/connection");
const { DataTypes, Model } = require("sequelize");
const ProductsModel = require("./ProductsModel");
const CategoriesModel = require("./CategoriesModel");

class ProductsCategoriesModel extends Model {}

ProductsCategoriesModel.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductsModel,
        key: "id",
      },
      allowNull: false,
    },
    id_category: {
      type: DataTypes.INTEGER,
      references: {
        model: CategoriesModel,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "product_category",
    sequelize: connection,
  }
);

module.exports = ProductsCategoriesModel;
