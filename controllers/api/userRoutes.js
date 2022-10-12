const router = require("express").Router();
// Add a comment describing the purpose of the 'get' route
// GET route for getting all of the dishes that are on the menu
router.get("/", (req, res) => {
  res.render("loginpage");
});

router.get("/browse", (req, res) => {
    res.render("browsepage");
});

router.get("/library", (req, res) => {
    res.render("librarypage");
});

module.exports = router;