// Router and Model import
const router = require('express').Router();
// const {User, Book} = require('../models');

// GET all users
// localhost:3001/api/users/
router.get('/', async (req, res) => {
    res.render('loginpage');
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