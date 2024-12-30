const connection = require("../config/connection");
const { DataTypes, Model } = require("sequelize");

class ProductsModel extends Model {}

ProductsModel.init(
  {
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_ids: {
      type: DataTypes.JSON,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    sequelize: connection,
    defaultScope: {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    },
  }
);

module.exports = ProductsModel;
