// Dependencies
const express = require("express");
// Import express-handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");
// Import DB connection
const sequelize = require("./config/connection");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
<<<<<<< HEAD
app.use(require("./controllers/api/userRoutes.js"));
=======
app.use(require("./controllers/api/"));
app.use(require("./controllers/api/email-routes.js"));
>>>>>>> 303defe (email route created and tested)

// ----- TEST ROUTE START
// const { Book, User } = require("./models");
// app.get("/api", async (req, res) => {
//   try {
//     // Get all users, sorted by name
//     const bookData = await Book.findAll({
//       include: [{ all: true, nested: true }],
//     });
//     res.status(200).json(bookData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// ----- TEST ROUTE END

// sync sequelize models to the database, then turn on the server and start listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
