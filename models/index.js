const Book = require("./Book");
const User = require("./User");

// User belongs to Book (as Owner and Borrower)
User.hasOne(Book, { as: "owner", foriegnKey: "owner_id" });

Book.belongsTo(User, { as: "owner", foriegnKey: "owner_id" });

User.hasOne(Book, { as: "borrower", foriegnKey: "borrower_id" });

Book.belongsTo(User, { as: "borrower", foriegnKey: "borrower_id" });

module.exports = { Book, User };
