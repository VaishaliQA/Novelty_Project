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

// GET a book by ID (Using in Modal Handlebars)
router.get('/:id', async (req, res) => {
  try{ 
      const bookData = await Book.findByPk(req.params.id, { include: [{model: User, as:"owner"}] });
      if(!bookData) {
          res.status(404).json({message: 'No book with this id!'});
          return;
      }
      const book = bookData.get({ plain: true });
      res.render('book', { book });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };     
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
