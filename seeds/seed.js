const sequelize = require("../config/connection");

const { User } = require("../models");
const { Book } = require("../models");

const userData = require("./userData.json");
const bookData = require("./bookData.json");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await User.bulkCreate(userData);
    console.log("\n----- USERS SEEDED -----\n");

    await Book.bulkCreate(bookData);
    console.log("\n----- BOOKS SEEDED -----\n");
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedAll();
