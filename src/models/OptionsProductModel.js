const connection = require("../config/connection");
const { DataTypes, Model } = require("sequelize");
const ProductsModel = require("./ProductsModel");

class OptionsProductModel extends Model {}

OptionsProductModel.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductsModel,
        key: "id",
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shape: {
      type: DataTypes.ENUM("square", "circle"),
      defaultValue: "square",
    },
    radius: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM("text", "color"),
      defaultValue: "text",
    },
    values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "options_products",
    sequelize: connection,
  }
);

module.exports = OptionsProductModel;
