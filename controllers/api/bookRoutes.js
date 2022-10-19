// Router and Model import
const router = require("express").Router();
const { User, Book } = require("../../models");
const { Op } = require("sequelize");

// GET all books, except for books owned by user
// localhost:3001/api/books/
router.get("/browse", async (req, res) => {
  try {
    // lookup user id within session
    const user_id = req.session.user_id;

    // Show all books, except from owner
    const bookData = await Book.findAll({
      include: [{ all: true, nested: true }],
      where: { owner_id: { [Op.ne]: user_id } },
    });

    // bookData (list of objects) passed to Browse view as context,
    // Browse view references Book partial, Each helper to render multiple books
    // Book partial reference book object fields

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET books owned by user & borrowed by user
// localhost:3001/api/books/library
router.get("/library", async (req, res) => {
  try {
    // lookup user id within session
    const user_id = req.session.user_id;

    // query db for books owned by user
    const booksOwned = await Book.findAll({
      include: [{ all: true, nested: true }],
      where: { owner_id: user_id },
    });

    // query db for books borrowed by user
    const booksBorrowed = await Book.findAll({
      include: [{ all: true, nested: true }],
      where: { borrower_id: user_id },
    });

    res
      .status(200)
      .json([{ books_owned: booksOwned }, { books_borrowed: booksBorrowed }]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one book by id
// localhost:3001/api/books/:id
router.get("/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "owner",
        },
      ],
    });
    if (!bookData) {
      res.status(404).json({ message: "No book with this id!" });
      return;
    }
    const book = bookData.get({ plain: true });
    console.log("book", book);
    res.json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST new book (Add new book in database)
// localhost:3001/api/books/
router.post("/", async (req, res) => {
  try {
    const postData = await Book.create({
      title: req.body.title,
      isbn13: req.body.isbn13,
      authors: req.body.authors,
      published_date: req.body.published_date,
      description: req.body.description,
      categories: req.body.categories,
      thumbnail_url: req.body.thumbnail_url,
      owner_id: req.session.user_id,
      borrower_id: null,
      available: false,
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// PUT book (update status of book and borrower id)
// localhost:3001/api/books/:id
router.put("/:id", async (req, res) => {
  try {

    if (req.body.borrower_id == req.session.user_id) {
      const updateStatus = await Book.update({
        available : true, 
        borrower_id : null
      }, {
        where: { id: req.params.id },
      });
      res.status(200).json(updateStatus);
    } else {
      const updateStatus = await Book.update({
        available : false, 
        borrower_id : req.body.borrower_id
      }, {
        where: { id: req.params.id },
      });
      res.status(200).json(updateStatus);
    }
    
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

// DELETE book by id
// localhost:3001/api/books/:id
router.delete("/:id", async (req, res) => {});

module.exports = router;
