// Router import and empty {} for when Models are set up
const router = require('express').Router();
const {} = require('../models');

// GET route for homepage (explore)
router.get('/', async (req, res) => {
    res.render('all');
});

// GET route by book
router.get('/book', async (req, res) => {
    
});

// GET route by user
router.get('/user', async (req, res) => {
    
});

// GET route by status
router.get('/status', async (req, res) => {
    
});

// POST route to create book
router.post('/create', async (req, res) => {
    
});

// PUT route to change status
router.put('/status', async (req, res) => {
    
});

module.exports = router;