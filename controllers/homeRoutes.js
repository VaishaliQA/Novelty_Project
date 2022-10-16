const router = require("express").Router();
const { User, Book } = require("../models");
const withAuth = require("../utils/auth");

// find all users and map data.
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["first_name", "ASC"]],
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

// // GET a book by ID
// router.get('/:id', async (req, res) => {

// });

// Redirect to login route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("loginpage");
});

module.exports = router;
