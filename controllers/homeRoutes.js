const router = require("express").Router();
const { User, Book } = require("../models");
const withAuth = require("../utils/auth");

// Temp DB
const db = [
  {
    "id": "1",
    "isbn": "123456",
    "title": "title",
    "author": "author",
    "description": "description",
    "image_link": "image link",
    "categories": "categories",
    "owner_id": "1",
    "borrower_id": "1",
    "availability": "availability"
}
];

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
router.get('/:id', async (req, res) => {
  try{ 
      // const bookData = await Book.findByPk(req.params.id);
      // const bookData = await Book.findOne({
      //   where: {
      //     id: req.params.id,
      //   },
      //   include: [User],
      // });
      const bookData = await Book.findByPk(req.params.id, { include: [{model: User, as:"owner"}] });
      // console.log("BOOK DATA 1", bookData);
      if(!bookData) {
          res.status(404).json({message: 'No book with this id!'});
          return;
      }
      // res.json(bookData);
      const book = bookData.get({ plain: true });
      // console.log("BOOK DATA 2", book);
      res.render('book', { book });
      // res.render('book', book);
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
