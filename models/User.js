const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Book = require("./Book");

// Initialize User model (table) by extending off Sequelize's Model class
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    first_name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    // todo consider dropping location from mvp
    location: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
module.exports = User;
