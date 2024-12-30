const connection = require("../config/connection");
const { DataTypes, Model } = require("sequelize");
const ProductsModel = require("./ProductsModel");

class ImagesProductModel extends Model {}

ImagesProductModel.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductsModel,
        key: "id",
      },
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "images_products",
    sequelize: connection,
  }
);

module.exports = ImagesProductModel;
