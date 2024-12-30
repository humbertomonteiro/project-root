const connection = require("../config/connection");
const { DataTypes, Model } = require("sequelize");

class CategoriesModel extends Model {}

CategoriesModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "category",
    sequelize: connection,
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);

module.exports = CategoriesModel;
