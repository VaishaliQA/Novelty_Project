const router = require("express").Router();
const { User, Book } = require("../models");
const withAuth = require("../utils/auth");

// TODO: Remove this for testing and uncomment the get router below
// GET all users
// localhost:3001/api/users/
router.get('/', async (req, res) => {
  res.render('librarypage');
});

// Redirect to login route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("loginpage");
});

module.exports = router;
