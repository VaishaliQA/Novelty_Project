const router = require("express").Router();
const { User, Book } = require("../models");
const withAuth = require("../utils/auth");

// Temporary re-route to browse page for testing
router.get("/", (req, res) => {
  res.render("browsepage");
});

// Change /login back to /
// find all users and map data.
router.get("/login", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("browsepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a book
router.get("/:id", (req, res) => {
  // Get one book from the book table
  Book.findOne(
    {
      // Gets the book based on the id given in the request parameters
      where: { 
        id: req.params.id 
      },
    }
  ).then((bookData) => {
    res.json(bookData);
    console.log(bookData);
  });
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
