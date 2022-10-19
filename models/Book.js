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
    isbn13: {
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
      // getter function to stringify array and remove brackets upon submittal
      set(value) {
        this.setDataValue(
          "authors",
          JSON.stringify(value)
            .replace("[", "")
            .replace("]", "")
            .replace(/['"]+/g, "")
        );
      },
    },
    published_date: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categories: {
      type: DataTypes.CHAR,
      allowNull: true,
      // getter function to stringify array and remove brackets upon submittal
      set(value) {
        this.setDataValue(
          "categories",
          JSON.stringify(value)
            .replace("[", "")
            .replace("]", "")
            .replace(/['"]+/g, "")
        );
      },
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
    available: {
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
