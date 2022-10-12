const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Initialize User model (table) by extending off Sequelize's Model class
class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    title: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    authors: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categories: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    thumbnail_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
    borrower_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "user", key: "id" },
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "book",
  }
);
module.exports = Book;
