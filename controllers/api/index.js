const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');

// localhost:3001/api/books
router.use('/books' , bookRoutes);
// localhost:3001/api/users
router.use('/users' , userRoutes);

module.exports = router;
