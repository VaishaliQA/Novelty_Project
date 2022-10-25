const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const emailRoutes = require("./emailRoutes");

// localhost:3001/api/books
router.use("/books", bookRoutes);
// localhost:3001/api/users
router.use("/users", userRoutes);
// localhost:3001/api/email
router.use("/email", emailRoutes);

module.exports = router;
