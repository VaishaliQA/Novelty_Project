// Router and Model import
const router = require("express").Router();
const { User, Book } = require("../../models");

// GET all books
// localhost:3001/api/books/
router.get("/", async (req, res) => {
  // res.render("loginpage");
});

// GET one book
// localhost:3001/api/books/:id
router.get("/:id", async (req, res) => {
  try{ 
    const bookData = await Book.findByPk(req.params.id, { include: [{model: User, as:"owner"}] });
    if(!bookData) {
        res.status(404).json({message: 'No book with this id!'});
        return;
    }
    const book = bookData.get({ plain: true });
    console.log("book", book);
    res.json(book);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  };  
});

// POST new book
// localhost:3001/api/books/
router.post("/", async (req, res) => {});

// PUT book (update info)
// localhost:3001/api/books/:id
router.put("/:id", async (req, res) => {});

// DELETE book by id
// localhost:3001/api/books/:id
router.delete("/:id", async (req, res) => {});

module.exports = router;
