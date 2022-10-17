const router = require("express").Router();
const { User, Book } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");

// find all users and map data.
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["first_name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    // lookup user id within session
    const user_id = req.session.user_id;

    // Show all books, except from owner
    const bookData = await Book.findAll({
      include: [{ all: true, nested: true }],
      where: { owner_id: { [Op.ne]: user_id } },
    });

    const books = bookData.map((book) => book.get({ plain: true }));

    console.log(books);

    res.render("browsepage", {
      users,
      logged_in: req.session.logged_in,
      books,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Redirect to login route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("loginpage");
});

// Redirect to library route
router.get("/library", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/librarypage");
    return;
  }
  res.render("libraryPage");
});

// route for librarypage access
router.get("/librarypage", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["first_name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("libraryPage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
