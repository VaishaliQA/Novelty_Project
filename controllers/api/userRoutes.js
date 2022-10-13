// Router and Model import
const router = require('express').Router();
// const {User, Book} = require('../../models');

// Handle browse and library pages
router.get('/browse', async (req, res) => {
    res.render('browsepage');
});

// GET all users
// localhost:3001/api/users/
router.get('/library', async (req, res) => {
    res.render('librarypage');
});

// GET one user
// localhost:3001/api/users/:id
router.get('/:id' , async(req, res) => {

});

// POST new user
// localhost:3001/api/users/
router.post('/', async (req, res) => {
    
});

// PUT user (update info)
// localhost:3001/api/users/:id
router.put('/:id' , async(req, res) => {

});

// DELETE user by id
// localhost:3001/api/users/:id
router.delete('/:id' , async(req, res) => {

});

// ----- SESSION ROUTES ----- 

// Check req creds and create session
// localhost:3001/api/users/login
router.post('/login' , async(req, res) => {

});

// Destroy session
// localhost:3001/api/users/logout
router.post('/logout' , async(req, res) => {

});

module.exports = router;