// Router and Model import
const router = require("express").Router();
const { User, Book } = require("../../models");
const bcrypt = require("bcrypt");

// GET all users
// localhost:3001/api/users/
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [Book],
    });
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

// GET one user
// localhost:3001/api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const oneUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [Book],
    });
    res.status(200).json(oneUser);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

// POST new user
// localhost:3001/api/users/
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      location: req.body.location,
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

// PUT user (update info)
// localhost:3001/api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

// DELETE user by id
// localhost:3001/api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const delUser = await User.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(delUser);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

// ----- SESSION ROUTES -----

// Check req creds and create session
// localhost:3001/api/users/login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log("email :", req.body.email);
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // compare bcrypt password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(400).json(err);
  }
});

// Destroy session
// localhost:3001/api/users/logout
router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
