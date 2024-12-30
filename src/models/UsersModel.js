const connection = require("../config/connection");
const { DataTypes, Model } = require("sequelize");

class UsersModel extends Model {}

UsersModel.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize: connection,
    defaultScope: {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    },
  }
);

module.exports = UsersModel;
